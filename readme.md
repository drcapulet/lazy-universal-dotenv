# Lazy Universal DotEnv

[npm]: https://www.npmjs.com/package/universal-dotenv
[travis]: https://travis-ci.org/storybooks/lazy-universal-dotenv

Lazy Universal DotEnv - A Robust Environment Configuration for Universal Applications.

This solution is heavily inspired by the approach chosen by [Create React App](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#what-other-env-files-can-be-used) and made available for general usage.

## Features

- Supports loading `.env` files with overriding between different `NODE_ENV` settings and `BUILD_TARGET` configurations.
- Supports variable expansion between different settings.
- Allows local overrides using files which use a ".local" postfix.

## All Strings

It is important to remember that all environment variables are always stored as strings. Even numbers and booleans. The casting to other types must therefore take place in the application code. See also: https://github.com/motdotla/dotenv/issues/51

## Variables

- `NODE_ENV`: Typically either `production`, `development` or `test`
- `BUILD_TARGET`: Either `client` or `server`

## File Priority

Files are being loaded in this order. Values which are already set are never overwritten. Command line environment settings e.g. via [cross-env](https://www.npmjs.com/package/cross-env) always win.

- `.env.${BUILD_TARGET}.${NODE_ENV}.local`
- `.env.${BUILD_TARGET}.${NODE_ENV}`
- `.env.${BUILD_TARGET}.local`
- `.env.${BUILD_TARGET}`
- `.env.${NODE_ENV}.local`
- `.env.${NODE_ENV}`
- `.env.local`
- `.env`

Note: `local` files without `NODE_ENV` are not respected when running in `NODE_ENV=test`.

## Basic Usage

All loading features are enabled by importing the core module itself:

```js
import "lazy-dotenv-universal"
```

After this you can access all environment settings you have defined in one of your `.env` files.

```
MY_END=awesome
```

```js
console.log(process.env.MY_ENV); // -> "awesome"
```

## Serialization

The module offers access to all app specific environment settings which should be prefixed with `APP_` e.g. `APP_TITLE = "My App"`.

```js
import { getEnvironment } from "lazy-dotenv-universal"

const { raw, stringified, webpack } = getEnvironment()
```

Return values:

- raw: Just a plain JS object containing all app settings
- stringified: Plain object but with JSON stringified values
- webpack: For usage with [Webpacks Define Plugin](https://webpack.js.org/plugins/define-plugin/)

## License

[Apache License Version 2.0, January 2004](license)

## Copyright

Copyright 2018<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)
