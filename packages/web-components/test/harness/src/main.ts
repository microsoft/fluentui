if (!CSS.supports('anchor-name: --foo')) {
  import('@oddbird/css-anchor-positioning/fn').then(({ default: applyPolyfill }) => {
    Object.defineProperty(window, 'CSS_ANCHOR_POLYFILL', {
      value: applyPolyfill,
    });
  });
}

if (!('focusgroup' in HTMLElement.prototype)) {
  import('../../../public/focusgroup-polyfill.js').then(({ polyfill }) => {
    Object.defineProperty(window, 'FOCUSGROUP_POLYFILL', {
      value: polyfill,
    });
  });
}

import { webLightTheme } from '@fluentui/tokens';
import { setTheme } from '../../../src/theme/set-theme.js';
import '../../../src/index-rollup.js';

setTheme(webLightTheme);

Object.defineProperty(window, 'setTheme', {
  value: setTheme,
});
