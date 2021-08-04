import { useGlobals as useStorybookGlobals, Args as StorybookArgs } from '@storybook/api';
import { StoryContext as StorybookContext } from '@storybook/addons';

import { STRICT_MODE_ID, THEME_ID } from './constants';
import { ThemeIds } from './theme';

export interface StoryContext extends StorybookContext {
  globals: Globals;
}
export interface Globals extends StorybookArgs {
  [STRICT_MODE_ID]?: boolean;
  [THEME_ID]?: ThemeIds;
}

export function useGlobals(): [Globals, (newGlobals: Globals) => void] {
  return useStorybookGlobals();
}
