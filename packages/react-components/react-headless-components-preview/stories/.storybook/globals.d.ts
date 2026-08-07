/**
 * Webpack-injected global that maps component display names to their
 * state-driven data-attribute metadata.  Populated at build time by the
 * headless component build pipeline.
 */
declare const HEADLESS_STATE_DATA_ATTRIBUTES: Record<
  string,
  Array<{ name: `data-${string}`; type: string; description: string }>
>;
