# Nuxt 3 Multi Analytics

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Pixel's and Conversion APIs for most popular social media nettworks.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-multi-analytics?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- 🌻 No dependencies except each services pixel
- 🤝 Manual consent management for GDPR compliance
- 📯 Track events manually with composables
- 🏷️ Fully typed
- 🦾 SSR-ready
- 🔶 Supported pixels:
  - Meta (Facebook) pixel
  - Reddit Pixel

## Planned features

- Reddit Conversion API [(CAPI)](https://ads-api.reddit.com/docs/v2/#tag/Conversions)
- Meta Conversion API [(CAPI)](https://developers.facebook.com/docs/marketing-api/conversions-api/)
- [Google GA4](https://support.google.com/analytics/answer/9304153?hl=en)
- Snapchat Pixel & Conversion API [(CAPI)](https://businesshelp.snapchat.com/s/article/integrating-marketing-api?language=en_US)
- [TikTok Pixel](https://ads.tiktok.com/help/article/get-started-pixel?lang=en) & [Event API](https://ads.tiktok.com/help/article/events-api?redirected=2)
- Twitter/X Pixel & Conversion API (CAPI)
- Google Ads Pixel
- Multiple pixel IDs by config.

## Setup

```bash
# Using pnpm
pnpm add -D nuxt-multi-analytics

# Using yarn
yarn add --dev nuxt-multi-analytics

# Using npm
npm install --save-dev nuxt-multi-analytics
```

## Basic Usage

```js
export default defineNuxtConfig({
  modules: ['nuxt-multi-analytics'],

  multiAnalytics: {
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

| Option            | Type                 | Default   | Description                                                           |
| ----------------- | -------------------- | --------- | --------------------------------------------------------------------- |
| `debugt`          | `boolean`            | `false`   | Whether to show detailed info log of what each pixel is doing.        |
| `autoPageView`    | `boolean`            | `true`    | Whether to track standard `track` value for all pixels.               |
| `initialConsent`  | `boolean`            | `true`    | Whether to initially consent to tracking.                             |
| `loadingStrategy` | `'async' \| 'defer'` | `'defer'` | The loading strategy to be used for the each individual pixel script. |

Options for each individual pixel, all pixels have the same options.

| Option    | Type     | Default             | Description                                  |
| --------- | -------- | ------------------- | -------------------------------------------- |
| `pixelID` | `string` | `null`              | The id of the pixel.                         |
| `track`   | `string` | `[page view event]` | The event that will be standard for `track`. |
| `version` | `string` | `[latest version]`  | Version to be used of pixel script.          |

Special options for Facebook.

| Option       | Type      | Default | Description                                                            |
| ------------ | --------- | ------- | ---------------------------------------------------------------------- |
| `manualMode` | `boolean` | `false` | If the pixel should automatically track events such as a button click. |

## Composables

### `useConsent`

```ts
const { haveConsent, grantConsent, revokeConsent } = useConsent();
```

### `useMultiAnalytics`

```ts
const { track, init, setUserData } = useMultiAnalytics();
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

[npm-version-src]: https://img.shields.io/npm/v/nuxt-multi-analytics/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-multi-analytics
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-multi-analytics.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-multi-analytics
[license-src]: https://img.shields.io/npm/l/nuxt-multi-analytics.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-multi-analytics
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
