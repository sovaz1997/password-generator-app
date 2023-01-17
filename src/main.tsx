import React from 'react';
import ReactDOM from 'react-dom/client';
import { HotkeysProvider } from 'react-hotkeys-hook';
import ThemeProvider from './providers/theme';
import { HotkeysScopes } from './constants/hotkeys';
import App from './app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HotkeysProvider initiallyActiveScopes={[HotkeysScopes.MAIN]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HotkeysProvider>
  </React.StrictMode>,
);
