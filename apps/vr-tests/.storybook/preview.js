// @ts-check
import * as React from 'react';
import { setAddon } from '@storybook/react';
import { setRTL } from '@fluentui/react/lib/Utilities';
import { ThemeProvider } from '@fluentui/react';
import { DarkTheme } from '@fluentui/theme-samples';

/**
 * @deprecated https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-setaddon
 *
 * TODO: rework this to be conformant with Component Story Format
 *
 * Via this addon, we INVENT a new API that automatically adds several
 * stories for you when you call addStory() that adds variants (like RTL)
 *
 * addStory() is not an official Storybook API
 *
 * Adds a story with different configuration options.
 * By default, only adds a story in LTR.
 * The config parameter can be used to add the story RTL in addition to LTR.
 * In future, this can add a story with additional configurations such as theming.
 */
setAddon({
  /**
   * @type {import('../src/utilities/types').ExtendedStoryApi['addStory']}
   * @this {import('../src/utilities/types').ExtendedStoryApi}
   */
  addStory(storyName, storyFn, config = {}) {
    this.add(storyName, context => {
      setRTL(false);
      return storyFn(context);
    });
    if (config.includeDarkMode) {
      this.add(storyName + ' - Dark Mode', context => {
        setRTL(false);
        return <ThemeProvider theme={DarkTheme}>{storyFn(context)}</ThemeProvider>;
      });
    }
    if (config.includeRtl) {
      this.add(storyName + ' - RTL', context => {
        setRTL(true);
        return storyFn(context);
      });
    }

    return this;
  },
});

export const parameters = { layout: 'none' };
