import { webLightTheme } from '@fluentui/tokens';
import { setTheme } from '../../../src/theme/set-theme.js';
import '../../../src/index-rollup.js';

setTheme(webLightTheme);

Object.defineProperty(window, 'setTheme', {
  value: setTheme,
});
