import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';
import './i18n';

import { PostHogProvider } from 'posthog-js/react';
import { PosthogManager } from './managers/PosthogManager';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

PosthogManager.initialize();
const posthogClient = PosthogManager.getClient();

createRoot(rootElement).render(
  <StrictMode>
    {posthogClient ? (
      <PostHogProvider client={posthogClient}>
        <App />
      </PostHogProvider>
    ) : (
      <App />
    )}
  </StrictMode>
);
