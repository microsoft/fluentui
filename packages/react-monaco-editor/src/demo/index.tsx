import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { mergeStyles, initializeIcons, ThemeProvider } from '@fluentui/react';
import { App } from './App';

initializeIcons();

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh',
    },
  },
});

ReactDOMClient.createRoot(document.getElementById('content')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
