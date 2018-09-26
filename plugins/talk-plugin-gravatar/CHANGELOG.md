# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.1.3 - 2018-05-21
### Changed
- Fixed bug where plugin could not update user model with avatar

## 0.1.2 - 2018-04-22
### Changed
- Fixed bug where only the fallback Gravatar avatar was returned

## 0.1.1 - 2018-04-22
### Added
- Installation instructions

### Changed
- Fixed bug causing undefined avatar id in the avatar URLs

## 0.1.0 - 2018-04-22
### Added
- Avatar proxy URl
- Avatar caching in Talk's redis cache
- Gravatar proxy id property to user models
- Avatar property to graphql User type

[Unreleased]: https://github.com/snorremd/talk-plugin-gravatar/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/snorremd/talk-plugin-gravatar/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/snorremd/talk-plugin-gravatar/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/snorremd/talk-plugin-gravatar/compare/v0.1.0...v0.1.1
