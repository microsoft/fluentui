/**
 * SSR server-side entry module for the Fluent UI web-components test harness.
 *
 * This module is loaded by the test harness server via `vite.ssrLoadModule("/src/entry-server.js")` and must export a
 * `render` function. The server calls `render()` for each SSR fixture request, injecting the returned HTML into the
 * `ssr.html` template.
 *
 * The `<--stylespreload-->`, `<--templates-->`, and `<--fixture-->` markers in `ssr.html` are replaced with the appropriate content during rendering:
 * - `<--stylespreload-->` is replaced with a `<link rel="preload">` tag for the theme stylesheet specified in the renderer options.
 * - `<--templates-->` is replaced with the rendered HTML for the component templates defined in the renderer options.
 * - `<--fixture-->` is replaced with the rendered HTML for the specific SSR fixture being requested, which is
 *   determined by the request URL and any query parameters.
 *
 * Note that this module should only include code necessary for rendering the SSR fixture source HTML. Any client-side
 * setup or component definitions should be placed in the separate `entry-client.ts` module, to be loaded on the client
 * after hydration.
 */

import { createSSRRenderer } from '@microsoft/fast-test-harness/ssr/render.js';

export const { render } = createSSRRenderer({
  packageName: '@fluentui/web-components',
  tagPrefix: 'fluent',
  themeStylesheet: '/fluent-tokens.css',
});
