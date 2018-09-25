# Talk &middot; [![CircleCI](https://circleci.com/gh/coralproject/talk.svg?style=svg)](https://circleci.com/gh/coralproject/talk) &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

- [Talk admin install](http://127.0.0.1:3000/admin/install)
- [Dev link](http://127.0.0.1:3000/dev)

## Boldium Installation from Source

Mostly lovingly borrowed from  from the [talk-documentation](https://docs.coralproject.net/talk/installation-from-source/)

To install Talk from Source, ensure that you have Node version 8+. Installing via source is the recommended method when developing as it give you the best tooling.

### Installing

First we will download and extract the latest codebase of Talk:

```
git clone git@github.com:boldium/talk.git
```

From here we need to fetch the dependencies and build the static assets using Yarn:

```
yarn
yarn build
```

You can either setup the required databases by visiting the docs for MongoDB and Redis, or using the following commands which will leverage Docker:

```
docker run -p 127.0.0.1:6379:6379 -d redis
docker run -p 127.0.0.1:27017:27017 -d mongo
```

or `yarn bold:docker`

Didn’t work? Sometimes you may already have a container running on these ports, run `docker ps` to see what other containers you have running and running `docker stop <id>` on those containers to stop them.

This documentation assumes that you will be running MongoDB on `127.0.0.1:27017` and Redis on `127.0.0.1:6379`. The above Docker commands bind MongoDB and Redis on these interfaces for you.

We should then specify the configuration variables that can be used to run the application locally in a file named `.env`. This will be read by the application when running in development mode:

```
NODE_ENV=development
TALK_MONGO_URL=mongodb://127.0.0.1:27017/talk
TALK_REDIS_URL=redis://127.0.0.1:6379
TALK_ROOT_URL=http://127.0.0.1:3000
TALK_PORT=3000
TALK_JWT_SECRET=password
```
a copy of this .env lives in example.env

This is only the bare minimum needed to run the demo, for more configuration variables, check out the [Configuration](https://docs.coralproject.net/talk/configuration/) section.

You can now start the application by running:

```
yarn watch:server
```

If you're doing development on plugins, and want to see your changes you can run 

```
yarn build
yarn watch:server
```

or `yarn bold:start`

If you're seeing an error that looks like this:

```
Sep 25 09:28:21 talk[2711] ERROR: onTick (./p/t/s/connect:144): could not handle user deletions
  err: Error: Talk is currently not setup. Please proceed to our web installer at $ROOT_URL/admin/install or run ./bin/cli-setup. Visit https://docs.coralproject.net/talk/ for more information on installation and configuration instructions
      at new ExtendableError (./errors.js:8:18)
      at new TalkError (./errors.js:23:5)
      at new ErrSettingsNotInit (./errors.js:276:5)
      at loadFn (./services/settings.js:16:11)
  version: "4.6.3"
  origin: "graph:context"
  traceID: "c710c713-f496-4a2e-817b-10f7ead77af7"
```
That's fine, it just means you need to go through the install process.

Continue onto the [Setup](https://docs.coralproject.net/talk/#setup) section for details on how to complete the installation and get started using Talk.

### [Tech Settings](http://127.0.0.1:3000/admin/configure/tech)

#### Permitted Domains

Under the heading *Permited Domains*, add `http://127.0.0.1:3000` and `http://localhost:3000`, or if you're serving talk from anywhere else, just grab that url. 

If you don't do this first, Comments won't actually work and you'll get a forever spinner and a [toast notification](https://en.wikipedia.org/wiki/Pop-up_notification) with a graphql error.

#### Styles

Our style.css are located in the styles directory, and can served however you'd like. Personally I like [http-server](https://www.npmjs.com/package/http-server) on npm, but whatever's clever. Once you get the css' url, you can add it under the heading *Custom CSS URL*.

## Boldium Plugins

Our 3 plugins are 
- [talk-plugin-author-menu](https://github.com/boldium/talk/tree/master/plugins/talk-plugin-author-menu), which allows us to customize the username in comments. [Here is the original](https://github.com/boldium/talk/tree/master/plugins/OLD--talk-plugin-author-menu)
- [boldium-no-timestamp](https://github.com/boldium/talk/tree/master/plugins/boldium-no-timestamp), which removes "Wrote this 2 weeks ago" from comments.
- [boldium-talk-plugin-respect](https://github.com/boldium/talk/tree/master/plugins/boldium-talk-plugin-respect), which changes the Applause text into a hands clapping emoji.

These should be automatically loaded since this installation has a plugins.json that includes them. To test out a basic install, just rename plugins.json to plugins_.json (or whatever), and it should load the default set of plugins.

## Begining of original README

Online comments are broken. Our open-source commenting platform, Talk, rethinks how moderation, comment display, and conversation function, creating the opportunity for safer, smarter discussions around your work. [Read more about Talk here](https://coralproject.net/talk).

Built with <3 by The Coral Project.

## Getting Started

Check out our Quickstart and Install guides to get started with Talk in our [Technical Docs](https://docs.coralproject.net/talk/).

## Product Guide

Learn more about Talk, including a deep dive into features for commenters and moderators, and FAQs in our [Talk Product Guide](https://docs.coralproject.net/talk/how-talk-works).

## Pre-Launch Guide

You’ve installed Talk on your server, and you’re preparing to launch it on your site. The real community work starts now, before you go live. You have a unique opportunity pre-launch to set your community up for success. Read our [Talk Community Guide](https://coralproject.net/blog/youve-installed-talk-now-what/).

## Advanced Usage

For advanced configuration and usage of Talk, check out our [Configuration](https://docs.coralproject.net/talk/advanced-configuration/) and [Integration](https://docs.coralproject.net/talk/integrating/authentication/) how-tos. This covers topics in whih you will need dev support to fully customize and integrate Talk, such as SSO/authentication, creating and managing assets and articles, styling Talk with custom CSS, and setting up Notifications and SMTP support.

## Versions & Upgrading

The current recommended release version is v4.5.0. ^4.5 (and all future even-numbered versions) are considered stable LTS versions. We recommend ^4.5 for use in production environments. 

## More Resources

- [Talk Product Roadmap](https://www.pivotaltracker.com/n/projects/1863625)
- [Our Blog](https://blog.coralproject.net/)
- [Community Forums](https://community.coralproject.net/)
- [Community Guides for Journalism](https://guides.coralproject.net/)
- [More About Us](https://coralproject.net/)

## End-to-End Testing

Talk uses [Nightwatch](http://nightwatchjs.org/) as our e2e testing framework. The testing infrastructure that allows us to run our tests in real browsers is provided with love by our friends at [Browserstack](https://browserstack.com).

[![Browserstack](/public/img/browserstack_logo.png)](https://browserstack.com)

## License

Talk is released under the [Apache License, v2.0](/LICENSE).