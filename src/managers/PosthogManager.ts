import posthog from 'posthog-js';
import type { PostHog, PostHogConfig } from 'posthog-js';

import { BaseManager } from './BaseManager';
import { getBooleanEnv, getEnvVar } from './env';

class PosthogManagerClass extends BaseManager {
  private client: PostHog | null = null;
  private initialized = false;

  initialize(): void {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }

    const apiKey = getEnvVar('VITE_PUBLIC_POSTHOG_KEY');
    const apiHost = getEnvVar('VITE_PUBLIC_POSTHOG_HOST');
    const assetHost = getEnvVar('VITE_PUBLIC_POSTHOG_ASSETS_URL');
    const debugMode = getEnvVar('VITE_PUBLIC_POSTHOG_DEBUG_MODE').toLowerCase();
    const pageviewEvent = getEnvVar('VITE_PUBLIC_POSTHOG_PAGEVIEW_EVENT');

    const config: Partial<PostHogConfig> = {
      api_host: apiHost,
      ui_host: assetHost,
      capture_pageview: getBooleanEnv('VITE_PUBLIC_POSTHOG_CAPTURE_PAGEVIEW'),
      capture_pageleave: getBooleanEnv('VITE_PUBLIC_POSTHOG_CAPTURE_PAGELEAVE'),
      capture_exceptions: getBooleanEnv('VITE_PUBLIC_POSTHOG_CAPTURE_EXCEPTIONS'),
      autocapture: getBooleanEnv('VITE_PUBLIC_POSTHOG_AUTOCAPTURE'),
      debug: debugMode === 'auto' ? import.meta.env.MODE === 'development' : debugMode === 'true',
    };

    posthog.init(apiKey, config);
    this.client = posthog;
    this.initialized = true;
    if (!config.capture_pageview) {
      posthog.capture(pageviewEvent);
    }
    this.emitChange();
  }

  getClient(): PostHog | null {
    return this.client;
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const PosthogManager = new PosthogManagerClass();
