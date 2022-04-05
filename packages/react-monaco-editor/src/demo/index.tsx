import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { mergeStyles, initializeIcons, ThemeProvider } from '@fluentui/react';

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

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('content'),
);
