if (!CSS.supports('anchor-name: --foo')) {
  import('@oddbird/css-anchor-positioning/fn').then(({ default: applyPolyfill }) => {
    Object.defineProperty(window, 'CSS_ANCHOR_POLYFILL', {
      value: applyPolyfill,
    });
  });
}

import { webLightTheme } from '@fluentui/tokens';
import { setTheme } from '../../../src/theme/set-theme.js';
import '../../../src/index-rollup.js';

setTheme(webLightTheme);

// Expose directly on window for Playwright test access
Object.defineProperty(window, 'setTheme', {
  value: setTheme,
});
