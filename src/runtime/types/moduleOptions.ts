import type {
  MetaEventNames,
  MetaApiVersion,
  RedditApiVersion,
  RedditEventNames,
  TwitterEventNames,
  TwitterApiVersion,
  GoogleEventNames,
} from './index';

interface StandardPixelOptions {
  pixelID: string | null;
  disabled?: boolean;
}

export interface MetaModuleOptions extends StandardPixelOptions {
  track?: MetaEventNames;
  version?: MetaApiVersion;
  manualMode?: boolean;
  // Currently not supported
  /* pixels?: {
    pixelId: string;
    routes: string[];
  }[]; */
}

export interface RedditModuleOptions extends StandardPixelOptions {
  track?: RedditEventNames;
  version?: RedditApiVersion;
  disableFirstPartyCookies?: boolean;
}

export interface GoogleModuleOptions extends StandardPixelOptions {
  track?: GoogleEventNames;
  /* version?: RedditApiVersion; */
}

export interface TwitterModuleOptions extends StandardPixelOptions {
  track?: TwitterEventNames;
  version?: TwitterApiVersion;
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
    twitter?: TwitterModuleOptions;
    google?: GoogleModuleOptions;
    linkedin?: {};
    snapchat?: {};
    tiktok?: {};
  };
}
