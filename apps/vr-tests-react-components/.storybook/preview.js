// @ts-check
import * as React from 'react';
import { setAddon } from '@storybook/react';
import { webLightTheme, webHighContrastTheme, webDarkTheme } from '@fluentui/react-theme';
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
    this.add(storyName, context => {
      return (
        <>
          <h3>Web light</h3>
          <FluentProvider theme={webLightTheme}>{storyFn(context)}</FluentProvider>
          {config.includeDarkMode && (
            <>
              <hr />
              <h3>Web dark</h3>
              <FluentProvider theme={webDarkTheme}>{storyFn(context)}</FluentProvider>
            </>
          )}
          {config.includeHighContrast && (
            <>
              <hr />
              <h3>Web high contrast</h3>
              <FluentProvider theme={webHighContrastTheme}>{storyFn(context)}</FluentProvider>
            </>
          )}
          {config.includeRtl && (
            <>
              <hr />
              <h3>RTL</h3>
              <FluentProvider theme={webLightTheme} dir="rtl">
                {storyFn(context)}
              </FluentProvider>
            </>
          )}
        </>
      );
    });

    return this;
  },
});

export const parameters = { layout: 'none' };

// For static storybook per https://github.com/screener-io/screener-storybook#testing-with-static-storybook-app
if (typeof window === 'object') {
  /** @type {*} */ (window).__screener_storybook__ = require('@storybook/react').getStorybook;
}
