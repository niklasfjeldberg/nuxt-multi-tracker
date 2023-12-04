# Nuxt Multi Tracker

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module that simplifies and unifies the use of tracking pixel's and Conversion APIs for most popular social media networks.

- ✨ &nbsp;[Release Notes](/CHANGELOG.md)
  - [🏀 Online playground](https://stackblitz.com/https://github.com/niklasfjeldberg/nuxt-multi-tracker/tree/master/playground)
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- 🔶 Minimal dependencies
- 🔶 Manual consent management for GDPR compliance
- 🔶 Track events manually with composables
- 🔶 Fully typed
- 🔶 SSR-ready
- 🔶 Supported pixels:
  - Meta (Facebook) pixel
  - Reddit Pixel

## Table of Contents

- [Install](#install)
- [Setup & basic Usage](#)
- [Module Options](#module-options)
- [Composables](#composables)
- [Development](#development)

## Planned features

- Reddit Conversion API [(CAPI)](https://ads-api.reddit.com/docs/v2/#tag/Conversions)
- Meta Conversion API [(CAPI)](https://developers.facebook.com/docs/marketing-api/conversions-api/)
- [Snapchat Pixel](https://businesshelp.snapchat.com/s/article/pixel-website-install?language=en_US) & Conversion API [(CAPI)](https://businesshelp.snapchat.com/s/article/integrating-marketing-api?language=en_US)
- [TikTok Pixel](https://ads.tiktok.com/help/article/get-started-pixel?lang=en) & [Event API](https://ads.tiktok.com/help/article/events-api?redirected=2)
- Twitter/X Pixel & Conversion API (CAPI)
- [Google GA4](https://support.google.com/analytics/answer/9304153?hl=en)
- Google Ads Pixel
- Multiple pixel IDs by config.

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

```js
export default defineNuxtConfig({
  modules: ['nuxt-multi-tracker'],

  multiTracker: {
    initialConsent: false,
    debug: false,
    autoPageView: true,
    loadingStrategy: 'defer',
    disabled: false,
    meta: {
      pixelID: 'xxxxxxx',
      track: 'PageView',
      version: '2.0',
      manualMode: false,
    },
  },
});
```

## Module Options

Options that affects all pixels.

| Option            | Type                 | Default   | Description                                                    |
| ----------------- | -------------------- | --------- | -------------------------------------------------------------- |
| `debug`           | `boolean`            | `false`   | Whether to show detailed info log of what each pixel is doing. |
| `autoPageView`    | `boolean`            | `true`    | Whether to track standard `track` value for all pixels.        |
| `initialConsent`  | `boolean`            | `true`    | Whether to initially consent to tracking.                      |
| `loadingStrategy` | `'async' \| 'defer'` | `'defer'` | The loading strategy to be used for all pixel scripts.         |

Options for each individual pixel, all pixels have these options.

| Option    | Type     | Default             | Description                                  |
| --------- | -------- | ------------------- | -------------------------------------------- |
| `pixelID` | `string` | `null`              | The id of the pixel.                         |
| `track`   | `string` | `[page view event]` | The event that will be standard for `track`. |
| `version` | `string` | `[latest version]`  | Version to be used of pixel script.          |

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
const { haveConsent, grantConsent, revokeConsent } = useConsent();
```

### `useMultiTracker`

```ts
const { track, init, setUserData } = useMultiTracker();
```

### `useMetaPixel`, `useRedditPixel`

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
} = useMetaPixel();
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
