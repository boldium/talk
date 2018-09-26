# talk-plugin-gravatar

[Demo](https://snorremd.github.io/talk-plugin-gravatar)

A simple Talk plugin to display Talk users' Gravatar avatars with as much
privacy as possible. The plugin acts as a proxy to gravatar and never directly
reveal the md5sum of a talk user's email. This avoids two key privacy concerns
normally faced when using gravatar:

1. Leaking emails via md5sums of said emails

By adding Gravatar image URLs to your site you are effectively leaking a lot of
information. The md5sum itself will be searchable and might reveal which other
sites the user registered for. md5sums are also trivially bruteforceable, and
any reverse lookup databases of emails that have been part of databreaches will
be even easier to look up.

2. Referer header passed to Gravatar

When a user's browser loads a Gravatar URL it will also send a referer header.
This header will reveal the exact page from which the avatar was loaded. This
info can be used by Gravatar to see which sites a user is posting on.

This plugin was inspired by the blog post
[How Gravatar hurts your visitors](https://fly.io/articles/how-gravatar-hurts-your-visitors/).

## Caveats

Gravatar still learns the IP of the Talk instance being used for comments thus
revealing which possible sites a user has commented on. The Fly.io solution
does not suffer this problem as their proxy, or the one you host yourself,
bears no direct conncetion to any sites. Another caveat is the added load being
imposed on your Talk instance.

## Installation

Add the plugin to the `plugins.default.json` file or create a `plugins.json`
file and add it there. See the [Coral Talk plugin docs](https://docs.coralproject.net/talk/plugins/)
for details about adding plugins.


Example `plugins.json` file:

```json
{
  "server": [
    {"talk-plugin-gravatar": "^0.1.2"}
  ],
  "client": [
    {"talk-plugin-gravatar": "^0.1.2"}
  ]
}
```

Then run `./bin/cli plugins reconcile` for source installs or an appropriate
command for your talk installation to make the plugin available.

## How the plugin works

The plugin works by adding an avatar property to the `User` type in the graphql
schema. When the avatar property resolver is called it will check if the user
model in the database contains an avatar value, if not an uuid is created and
stored. Finally the avatar resolver will return the uuid.

Next the client Avatar component will add an `img` element to a comment
referencing the plugin's avatar endpoint: `<your-talk-domain>/avatar/:avatar`.
The request handler in the plugin will first check if the avatar with the given
id is cached in Talk's Redis cache. Cached avatars are immediately returned. If
an avatar is not cached the request handler will fetch it from Gravatar and
then cache it for 24 hours. The request handler also returns an ETag header
based on an md5sum of the avatar contents to save bandwith.

Caching is set to 24 hours expiry time to avoid hammering Gravatar with
requests from the API. 

## Development

Fork this repository if you have not already done so. Then follow the
[Installation from source](https://docs.coralproject.net/talk/) guide to get a
local copy of Talk. Once you have a local `talk` folder enter the `plugins`
directory and clone your forked repository:

```
$ cd plugins
$ git clone git@github.com:<youruser>/talk-plugin-gravatar.git
```

Add a `plugins.json` file with the following contents under the `talk` folder:

```json
{
  "server": [
    "talk-plugin-gravatar"
  ],
  "client": [
    "talk-plugin-gravatar"
  ]
}
```

Make sure you have set up mongodb and redis correctly and have configured Talk
according to the setup guide. Finally run the talk development script:

```bash
$ yarn watch
```

This will start the Talk server with the plugin enabled. You will have to go
through the Talk installation steps before you can create some test comments
and see the plugin in action.

## Demonstration

See [Github page](https://snorremd.github.io/talk-plugin-gravatar/)
