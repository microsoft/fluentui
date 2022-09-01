import * as React from 'react';
import { setAddon } from '@storybook/react';
import { webLightTheme, teamsHighContrastTheme, webDarkTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';

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
    this.add(storyName, (/** @type {import('../src/utilities/types').StoryContext} */ context) => {
      return <FluentProvider theme={webLightTheme}>{storyFn(context)}</FluentProvider>;
    });
    if (config.includeRtl) {
      this.add(storyName + ' - RTL', (/** @type {import('../src/utilities/types').StoryContext} */ context) => {
        return (
          <FluentProvider theme={webLightTheme} dir="rtl">
            {storyFn(context)}
          </FluentProvider>
        );
      });
    }
    if (config.includeDarkMode) {
      this.add(storyName + ' - Dark Mode', (/** @type {import('../src/utilities/types').StoryContext} */ context) => {
        return <FluentProvider theme={webDarkTheme}>{storyFn(context)}</FluentProvider>;
      });
    }
    if (config.includeHighContrast) {
      this.add(storyName + ' - High Contrast', (
        /** @type {import('../src/utilities/types').StoryContext} */ context,
      ) => {
        return <FluentProvider theme={teamsHighContrastTheme}>{storyFn(context)}</FluentProvider>;
      });
    }

    return this;
  },
});

export const parameters = { layout: 'none' };

// For static storybook per https://github.com/screener-io/screener-storybook#testing-with-static-storybook-app
if (typeof window === 'object') {
  /** @type {*} */ (window).__screener_storybook__ = require('@storybook/react').getStorybook;
}
