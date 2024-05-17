import { useGlobals as useStorybookGlobals, Args as StorybookArgs } from '@storybook/api';
import { StoryContext as StorybookContext, Parameters } from '@storybook/addons';

import { DIR_ID, MATERIAL_TYPE_ID, STRICT_MODE_ID, THEME_ID } from './constants';
import type { ThemeIds } from './theme';
import { MaterialTypeContextValue } from '@fluentui/react-shared-contexts';

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
  [MATERIAL_TYPE_ID]?: MaterialTypeContextValue;
}

/**
 * Extends the storybook parameters object to include fluent specific properties
 */
export interface FluentParameters extends Parameters {
  dir?: 'ltr' | 'rtl';
  fluentTheme?: ThemeIds;
  mode?: 'default' | 'vr-test';
  materialType?: MaterialTypeContextValue;
}

export function useGlobals(): [FluentGlobals, (newGlobals: FluentGlobals) => void] {
  return useStorybookGlobals();
}

export function parameters(options?: FluentParameters) {
  return { dir: 'ltr', fluentTheme: 'web-light', mode: 'default', semiTransparent: false, ...options };
}
