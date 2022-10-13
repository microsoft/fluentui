import { useGlobals as useStorybookGlobals, Args as StorybookArgs, Parameters } from '@storybook/api';
import { StoryContext as StorybookContext } from '@storybook/addons';

import { THEME_ID } from './constants';
import { ThemeIds } from './theme';

export interface FluentStoryContext extends StorybookContext {
  globals: FluentGlobals;
  parameters: FluentParameters;
}

/**
 * Extends the storybook globals object to include fluent specific properties
 */
export interface FluentGlobals extends StorybookArgs {
  [THEME_ID]?: ThemeIds;
}

/**
 * Extends the storybook parameters object to include fluent specific properties
 */
export interface FluentParameters extends Parameters {
  dir?: 'ltr' | 'rtl';
  fluentTheme?: ThemeIds;
  isVrTest?: boolean;
}

export function useGlobals(): [FluentGlobals, (newGlobals: FluentGlobals) => void] {
  return useStorybookGlobals();
}
