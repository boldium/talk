const crypto = require('crypto');
const uuid = require('uuid');
const fetch = require('node-fetch');
const UserModel = require('../../models/user');
const { createClientFactory } = require('../../services/redis');
const client = createClientFactory();

module.exports = {
  // Add avatar field to User type definition
  typeDefs: `
    type User {
      avatar: String
    }
  `,
  // The User resolver will return the avatar from the embedded user metadata.
  resolvers: {
    User: {
      async avatar(user) {
        return await proxiedGravatarURL(user);
      },
    },
  },
  // Add gravatar proxy route to router
  router: router,
};

/**
 * Looks up the gravatar proxy id of the given user.
 * If no proxy id is present, we create one and update the user,
 * then return the proxy id.
 */
async function proxiedGravatarURL(user) {
  if (user.metadata.gravatarProxyId) {
    return `/avatar/${user.metadata.gravatarProxyId}`;
  }

  const avatarId = uuid.v4();
  try {
    await UserModel.update(
      { id: user.id },
      {
        $set: {
          'metadata.gravatarProxyId': avatarId,
        },
      }
    );

    return `/avatar/${avatarId}`;
  } catch (error) {
    return null;
  }
}

/**
 *
 */
function md5Sum(string) {
  return crypto
    .createHash('md5')
    .update(string)
    .digest('hex');
}

/**
 * Given user with some email returns the corresponding md5sum gravatar URL.
 * If we are unable to compute the hash we use the default value from Gravatar.
 */
function gravatarURL(user) {
  let hash;
  if (user && user.profiles && user.profiles[0] && user.profiles[0].id) {
    hash = md5Sum(user.profiles[0].id);
  } else {
    hash = '00000000000000000000000000000000';
  }
  return `https://www.gravatar.com/avatar/${hash}`;
}

/**
 * Adds /avatar/:avatar proxy path to router which proxies Gravatar requests.
 */
async function router(router) {
  router.get('/avatar/:avatar', async (req, res, next) => {
    try {
      let cachedAvatar = await client().get(
        `gravatar-plugin[${req.params.avatar}]`
      );

      // Refetch avatar from gravatar if not in redis cache
      if (!cachedAvatar) {
        const user = await UserModel.findOne({
          'metadata.gravatarProxyId': req.params.avatar,
        });

        const gravatarUrl = await gravatarURL(user);

        const avatarResponse = await fetch(gravatarUrl, {
          headers: {
            'User-Agent':
              'talk-plugin-gravatar (https://github.com/snorremd/talk-plugin-gravatar)',
          },
        });

        cachedAvatar = await avatarResponse.buffer();

        client().set(
          `gravatar-plugin[${req.params.avatar}]`,
          cachedAvatar.toString('base64'),
          'EX',
          3600 * 24 // Cache for one day
        );
      }

      // Calculate etag to avoid needless bandwith usage
      const etag = md5Sum(cachedAvatar);

      if (req.headers['if-none-match'] === etag) {
        res.status(304).end();
      } else {
        res.set({ ETag: etag }).end(new Buffer(cachedAvatar, 'base64'));
      }
    } catch (error) {
      console.log(error);
      res.status(404).end();
    }
  });
}
