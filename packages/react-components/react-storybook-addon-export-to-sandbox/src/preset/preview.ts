import type { Parameters } from '@storybook/addons';
import type { StoryContextForEnhancers } from '@storybook/csf';

import { withExportToSandboxButton } from '../decorators/with-export-to-sandbox-button';

export const decorators = [withExportToSandboxButton];

export const parameters: Parameters = {
  docs: {
    /**
     * Override source code shown within "Show Code" Docs tab.
     * @see https://github.com/storybookjs/storybook/blob/release-6-5/addons/docs/docs/recipes.md#customizing-source-snippets
     */
    transformSource: (source: string, storyContext: StoryContextForEnhancers) => {
      // This config renders story source generated via `fullSource` parameter that is being added by @fluentui/babel-preset-storybook-full-source plugin, which is registered as part of this preset
      return storyContext.parameters.fullSource;
    },
  },
};
