// Type definitions extension for @storybook/addons 6.0.18
// Project: https://github.com/storybookjs/storybook/tree/main/lib/addons

import { ViewMode } from '@storybook/addons';
import { StoryContextForEnhancers } from '@storybook/csf';
import * as React from 'react';

declare module '@storybook/addons' {
  // PUBLIC API - extended definitions
  export interface Parameters extends ParametersExtended {}

  // =====
  interface ParametersExtended {
    controls?: ControlsParameters & DisableControl;
    /**
     * control the view mode
     * @default 'story'
     * @remarks
     * Note that this behaviour is rather confusing and will work only after 1st user interaction click
     * on particular menu item. On initial render canvas will be always rendered.
     *
     * @see https://github.com/storybookjs/storybook/blob/main/addons/docs/docs/recipes.md#controlling-a-storys-view-mode
     */
    viewMode?: ViewMode;
    /**
     * configure Storybook's preview tabs
     * @see https://github.com/storybookjs/storybook/blob/main/addons/docs/docs/recipes.md#reordering-docs-tab-first
     */
    previewTabs?: Record<'storybook/docs/panel' | 'canvas', { index?: number; hidden?: boolean }>;
    docs?: {
      description?: {
        /** Description for a whole component */
        component?: string;
        /** Description for an individual story */
        story?: string;
      };

      source?: {
        /**
         * enable/disable rendering decorators in Docs mode
         */
        excludeDecorators: boolean;
        type: 'source' | 'auto' | 'dynamic';
      };

      /**
       * Allows to override code that will be used for "Show Code" tab.
       * @see https://github.com/storybookjs/storybook/blob/release-6-5/addons/docs/docs/recipes.md#customizing-source-snippets
       */
      transformSource?: (snippet: string, storyContext: StoryContextForEnhancers) => string | undefined;

      container?: React.ComponentType<any>;
      page?: React.ComponentType<any>;

      /**
       * https://github.com/storybookjs/storybook/tree/main/addons/docs/react#inline-stories
       */
      inlineStories?: boolean;
    };
  }

  interface ControlsParameters {
    sort?: 'alpha' | 'requiredFirst' | 'none';
    expanded?: boolean;
    presetColors?: Array<string | { color: string; title?: string }>;
    hideNoControlsWarning?: boolean;
  }

  type DisableControl = { disable?: boolean };
}
