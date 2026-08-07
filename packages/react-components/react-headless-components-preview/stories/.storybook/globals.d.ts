/**
 * Webpack-injected global that maps component display names to their
 * state-driven data-attribute metadata.  Populated at build time by the
 * headless component build pipeline.
 */
declare const HEADLESS_STATE_DATA_ATTRIBUTES: Record<
  string,
  Array<{ name: `data-${string}`; type: string; description: string }>
>;

declare module '@storybook/react/dist/entry-preview-argtypes.mjs' {
  import type { ArgTypesExtractor } from 'storybook/internal/docs-tools';

  export const parameters: {
    docs: {
      extractArgTypes: ArgTypesExtractor;
    };
  };
}
