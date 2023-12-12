# Nuxt Multi Tracker

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module that simplifies and unifies the use of tracking pixel's and Conversion APIs for most popular social media networks.

> [!WARNING]
> This module is under development. It will break and how it functions will change. To debug it's recommended to use an extension such as "[Analytics/GTM/Pixel Debugger](https://chromewebstore.google.com/detail/analyticsgtmpixel-debugge/canpneabbfipaelecfibpmmjbdkiaolf)".

- ✨ [Release Notes](/CHANGELOG.md)
- 🏀 [Online playground](https://stackblitz.com/https://github.com/niklasfjeldberg/nuxt-multi-tracker/tree/master/playground)
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- Minimal dependencies
- Manual consent management for GDPR compliance
- Track events manually with composables
- Fully typed
- SSR-ready
- Supported pixels:
  - Meta (Facebook) pixel
  - Reddit pixel
  - Twitter pixel (alpha)
  - Google Analytics 4 (GA4) (alpha)

## Table of Contents

- [Install](#install)
- [Setup & basic Usage](#setup--basic-usage)
- [Module Options](#module-options)
- [Composables](#composables)
- [Development](#-development)

## Install

```bash
# Using pnpm
pnpm add -D nuxt-multi-tracker

# Using yarn
yarn add --dev nuxt-multi-tracker

# Using npm
npm install --save-dev nuxt-multi-tracker
```

## Setup & basic usage

With the following configuration the pixels with IDs will track page views.

```js
export default defineNuxtConfig({
  modules: ['nuxt-multi-tracker'],

  multiTracker: {
    initialConsent: false,
    meta: {
      pixelID: 'xxxxxxx',
    },
    reddit: {
      disable: true,
      pixelID: 'xxxxxxx',
    },
  },
});
```

## Module Options

### Options for all pixels

These options will affect all pixels, but an option on the individual pixel will override these options if they are in conflict.

| Option            | Type                 | Default   | Description                                                    |
| ----------------- | -------------------- | --------- | -------------------------------------------------------------- |
| `debug`           | `boolean`            | `false`   | Whether to show detailed info log of what each pixel is doing. |
| `autoPageView`    | `boolean`            | `true`    | Whether to track standard `track` value for all pixels.        |
| `initialConsent`  | `boolean`            | `true`    | Whether to initially consent to tracking.                      |
| `loadingStrategy` | `'async' \| 'defer'` | `'defer'` | The loading strategy to be used for all pixel scripts.         |
| `disabled`        | `boolean`            | `false`   | If all pixels should be disabled at start.                     |

### Options for each pixels

Options for each individual pixel, most pixels have all of these options.

| Option     | Type      | Default       | Description                                  |
| ---------- | --------- | ------------- | -------------------------------------------- |
| `pixelID`  | `string`  | `null`        | The id of the pixel.                         |
| `disabled` | `boolean` | `false`       | If the pixel should be disabled at start.    |
| `track`    | `string`  | `[page view]` | The event that will be standard for `track`. |
| `version`  | `string`  | `[latest]`    | Version to be used of pixel script.          |

### Meta (Facebook) options

| Option       | Type      | Default | Description                                                              |
| ------------ | --------- | ------- | ------------------------------------------------------------------------ |
| `manualMode` | `boolean` | `false` | Manual mode will disable automatic event tracking such as button clicks. |

### Reddit options

| Option                     | Type      | Default | Description                                  |
| -------------------------- | --------- | ------- | -------------------------------------------- |
| `disableFirstPartyCookies` | `boolean` | `false` | If the pixel should use first party cookies. |

## Composables

### `useConsent`

```ts
const {
  // Output is a boolean
  haveConsent,
  // No input or output
  grantConsent,
  revokeConsent,
} = useConsent();
```

### `useMultiTracker`

This composable uses the Meta pixel as default, meaning you should use Meta event names and user data. This composable works the same way as all others.

```ts
const { track, init, setUserData } = useMultiTracker();
```

### `usePixelMeta`, `usePixelReddit`, `usePixelTwitter`, `usePixelGoogle`

```ts
const {
  options,
  setPixel,
  setPixelId,
  setUserData,
  enable,
  disable,
  track,
  query,
  init,
} = usePixel...();
```

How to use `track()`.

```
// Uses default event name, the standard option is a page view
track()

// Spesify wich event you want to trigger
track('Lead')

// Custom event names will automatically be recognised and sent correctly
track('CustomEventName1')

track('Lead', {
  eventID: 'xxxxxxxxx' // Set eventID to duplicate events
  ...
  // All parameters are set in this object
})

```

How to use `init()` and related functions.

```
// Uses the default pixel ID
init()

// Will change the ID of the pixel in `options` and run `init()`
setPixelID('xxxx')

// Will set userdata in `options` and run `init()`. Se the type for all possible parameters.
setUserData({
  em: 'example@example.com',
  ...
})

```

How to use `query()`. This is a wrapper for the respective functions (`fbq`, `rdt`, `gtag`, etc.), and you can always use the functions directly if you prefer that.

```
query('track', {
  eventName: 'Lead',
  eventID: 'xxxxxx'
  .....
  // All parameters goes in this object
})
```

## 💻 Development

1. Clone this repository
2. Install dependencies using `npm install`
3. Run `npm run dev:prepare`
4. Start development server using `npm run dev`

Read "[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)" for naming your commits.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-multi-tracker/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-multi-tracker
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-multi-tracker.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-multi-tracker
[license-src]: https://img.shields.io/npm/l/nuxt-multi-tracker.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-multi-tracker
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
