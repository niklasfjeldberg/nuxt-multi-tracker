declare global {
  interface Window {
    fbq?: any; // Meta (Facebook) pixel
    rdt?: any; // Reddit pixel
    twq?: any; // Twitter pixel
    dataLayer?: any; // Google Tag
  }
}

export {};
