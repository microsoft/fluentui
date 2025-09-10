import { useGlobals as useStorybookGlobals } from '@storybook/manager-api';
import { Args as StorybookArgs, StoryContext as StorybookContext, Parameters } from '@storybook/react';

import { DIR_ID, STRICT_MODE_ID, THEME_ID } from './constants';
import type { ThemeIds } from './theme';

export interface FluentStoryContext extends StorybookContext {
  globals: FluentGlobals;
  parameters: FluentParameters;
}

/**
 * Extends the storybook globals object to include fluent specific properties
 */
export interface FluentGlobals extends StorybookArgs {
  [DIR_ID]?: 'ltr' | 'rtl';
  [THEME_ID]?: ThemeIds;
  [STRICT_MODE_ID]?: boolean;
}

/**
 * Extends the storybook parameters object to include fluent specific properties
 */
export interface FluentParameters extends Parameters {
  dir?: 'ltr' | 'rtl';
  fluentTheme?: ThemeIds;
  mode?: 'default' | 'vr-test';
  reactStorybookAddon?: {
    disabledDecorators?: ['AriaLive' | 'FluentProvider' | 'ReactStrictMode'];
    docs?: FluentDocsConfig;
  };
}

/**
 * Configuration for docs components
 */
type FluentDocsConfig =
  | boolean
  | {
      tableOfContents?: boolean;
      dirSwitcher?: boolean;
      themePicker?: boolean;
      argTable?:
        | boolean
        | {
            slotsApi?: boolean;
            nativePropsApi?: boolean;
          };
    };

export function useGlobals(): [FluentGlobals, (newGlobals: FluentGlobals) => void] {
  return useStorybookGlobals();
}

export function parameters(options?: FluentParameters): FluentParameters {
  return { dir: 'ltr', fluentTheme: 'web-light', mode: 'default', ...options };
}
export function getParametersConfig(context: FluentStoryContext): FluentParameters['reactStorybookAddon'] {
  return context?.parameters?.reactStorybookAddon;
}
