import type {
  MetaEventNames,
  MetaApiVersion,
  RedditApiVersion,
  RedditEventNames,
} from './index';

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
  pixelID: string | null;
  track: RedditEventNames;
  version: RedditApiVersion;
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