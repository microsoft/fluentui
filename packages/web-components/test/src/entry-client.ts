/**
 * SSR client-side entry module for the Fluent UI web-components test harness.
 *
 * This module is loaded by the test harness on the SSR entry page (`ssr.html`) and is responsible for providing
 * the necessary client-side setup to hydrate the server-rendered HTML and run the tests. This includes defining any
 * components used in the SSR fixtures and importing any necessary polyfills or shared setup code.
 *
 * Note that this module is separate from the CSR test entry point (`main.ts`) to avoid loading unnecessary code during
 * SSR tests. Only code that is required for hydrating the SSR fixtures and running the tests should be included here.
 */

import '@microsoft/fast-test-harness/ssr/entry-client.js';
import './common.js';

/**
 * `import.meta.glob` is a Vite-specific feature that allows us to dynamically import all component definitions without
 * having to manually maintain a list. The `eager: true` option ensures that these modules are imported immediately.
 *
 * The SSR/DSD fixtures require a slightly different set of component definitions than the CSR fixtures, facilitated
 * by the `define-async` modules - these definitions don't include templates or styles, since those are already included
 * in the server-rendered HTML and don't need to be reloaded on the client via the FAST Element component lifecycle.
 */
import.meta.glob('../../src/*/define-async.{ts,js}', { eager: true });
