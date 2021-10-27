import { useGlobals as useStorybookGlobals, Args as StorybookArgs } from '@storybook/api';
import { StoryContext as StorybookContext } from '@storybook/addons';
import addons from '@storybook/addons';

import { THEME_ID } from './constants';
import { ThemeIds } from './theme';

export interface FluentStoryContext extends StorybookContext {
  globals: FluentGlobals;
}

/**
 * Extends the storybook globals object to include fluent specific propoerties
 */
export interface FluentGlobals extends StorybookArgs {
  [THEME_ID]?: ThemeIds;
}

export function useGlobals(): [FluentGlobals, (newGlobals: FluentGlobals) => void] {
  return useStorybookGlobals();
}

export function setGlobalTheme(themeId: string): void {
  addons.getChannel().emit('updateGlobals', { globals: { [THEME_ID]: themeId } });
}
