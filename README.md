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

## Planned features

- Reddit Pixel & Conversion API (CAPI) [(documentation)](https://ads-api.reddit.com/docs/v2/#tag/Conversions)
- Meta (Facebook) Conversion API (CAPI) [(documentation)]()
- Google Ads Pixel [(documentation)]()
- Google GA4 [(documentation)]()
- Snapchat Pixel [(documentation)]()
- TikTok Pixel & Event API [(documentation)]()
- Twitter/X Pixel [(documentation)]()

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
    debug: false,
    initialConsent: true,
    meta: {
      pixelID: 'xxxxxxxxx',
    },
  },
});
```

## Composables

### `useMultiAnalytics`

```ts
const { haveConsent, grantConsent, revokeConsent } = useMultiAnalytics();
```

### `useMetaPixel`

```ts
const {
  options,
  setFbq,
  setPixelId,
  setUserData,
  enable,
  disable,
  track,
  query,
  init,
} = useMetaPixel();
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-multi-analytics/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-multi-analytics
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-multi-analytics.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-multi-analytics
[license-src]: https://img.shields.io/npm/l/nuxt-multi-analytics.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-multi-analytics
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
