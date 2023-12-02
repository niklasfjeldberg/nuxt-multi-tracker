import type { MetaEventNames, MetaApiVersion, RedditApiVersion } from './index';

export interface MetaModuleOptions {
  pixelID: string | null;
  track: MetaEventNames;
  version: MetaApiVersion;
  manualMode: boolean;
  // Currently not supported
  /* pixels?: {
    pixelId: string;
    routes: string[];
  }[]; */
}

export interface RedditModuleOptions {
  accountID: string | null;
  version?: RedditApiVersion;
  disabled?: boolean;
}

export interface ModuleOptions {
  private: {
    redditApiKey?: string | null;
    metaApiKey?: string | null;
    linkedinApiKey?: string | null;
    snapchatApiKey?: string | null;
    tiktokApiKey?: string | null;
    twitterApiKey?: string | null;
  };
  public: {
    initialConsent?: boolean;
    debug?: boolean;
    autoPageView?: boolean;
    loadingStrategy?: 'async' | 'defer';
    disabled?: boolean;
    reddit?: RedditModuleOptions;
    meta?: MetaModuleOptions;
    linkedin?: {};
    snapchat?: {};
    twitter?: {};
    tiktok?: {};
  };
}
