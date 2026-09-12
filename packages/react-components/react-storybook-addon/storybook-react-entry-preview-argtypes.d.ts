import type { ArgTypesExtractor } from 'storybook/internal/docs-tools';

declare module '@storybook/react/dist/entry-preview-argtypes.mjs' {
  export const parameters: {
    docs: {
      extractArgTypes: ArgTypesExtractor;
    };
  };
}
