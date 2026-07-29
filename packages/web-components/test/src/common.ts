// This module provides initialization tasks needed by both the CSR and SSR client-side entry points.

// This is needed for tests which call `window.setTheme()`.
import('../../src/theme/set-theme.js').then(({ setTheme }) => {
  Object.defineProperty(window, 'setTheme', { value: setTheme });
});

if (!CSS.supports('anchor-name: --foo')) {
  import('@oddbird/css-anchor-positioning/fn').then(({ default: applyPolyfill }) => {
    Object.defineProperty(window, 'CSS_ANCHOR_POLYFILL', { value: applyPolyfill });
  });
}
