/**
 * CSR client-side entry module for the Fluent UI web-components test harness.
 *
 * This module is loaded by the test harness on the CSR entry page (`index.html`) and is responsible for providing
 * the necessary client-side setup to run the tests. This includes defining any components used in the test fixtures
 * and importing any necessary polyfills or shared setup code.
 *
 * Note that this module is separate from the SSR entry point (`entry-client.ts`) to avoid loading unnecessary code
 * during SSR tests. Only code that is required for running the tests should be included here.
 */

import './common.js';

/**
 * `import.meta.glob` is a Vite-specific feature that allows us to dynamically import all component definitions without
 * having to manually maintain a list. The `eager: true` option ensures that these modules are imported immediately.
 *
 * The CSR fixtures require the full set of component definitions, including templates and styles, to be loaded on the
 * client via the FAST Element component lifecycle.
 */
import.meta.glob('../../src/*/define.{ts,js}', { eager: true });

import { setTheme } from '../../src/theme/set-theme.js';
Object.defineProperty(window, 'setTheme', {
  value: setTheme,
});
