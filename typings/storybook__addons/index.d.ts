// Type definitions extension for @storybook/addons 6.0.18
// Project: https://github.com/storybookjs/storybook/tree/main/lib/addons

import { ViewMode } from '@storybook/addons';
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
      };

      container?: React.ComponentType<any>;
      page?: React.ComponentType<any>;

      /**
       * https://github.com/storybookjs/storybook/tree/main/addons/docs/react#inline-stories
       */
      inlineStories?: boolean;
    };
    /**
     * @see https://github.com/microsoft/fluentui-storybook-addons
     */
    exportToCodeSandbox?: AddonExportToCodesandboxParameters;
  }

  interface AddonExportToCodesandboxParameters {
    /**
     * Dependencies that should be included with every story
     */
    requiredDependencies?: Record<string, string>;
    /**
     * Content of index.tsx in CodeSandbox
     */
    indexTsx?: string;
  }

  interface ControlsParameters {
    sort?: 'alpha' | 'requiredFirst' | 'none';
    expanded?: boolean;
    presetColors?: Array<string | { color: string; title?: string }>;
    hideNoControlsWarning?: boolean;
  }

  type DisableControl = { disable?: boolean };
}
