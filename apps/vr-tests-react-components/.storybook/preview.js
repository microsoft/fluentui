// @ts-check
import * as React from 'react';
import { setAddon } from '@storybook/react';
import { webLightTheme, webHighContrastTheme, webDarkTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';

const configToPropsMap = {
  includeDefault: { theme: webLightTheme, label: 'Web light' },
  includeDarkMode: { theme: webDarkTheme, label: 'Web dark' },
  includeHighContrast: { theme: webHighContrastTheme, label: 'Web high contrast' },
  includeRtl: { theme: webLightTheme, dir: 'rtl', label: 'RTL' },
};

const configDefaults = { includeDefault: true };

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
    const modeConfig = { ...configDefaults, ...config };
    this.add(storyName, context => {
      return (
        <>
          {Object.keys(modeConfig).map(configProp => {
            const { label, ...providerConfig } = configToPropsMap[configProp];
            return (
              <React.Fragment key={configProp}>
                <h3>{label}</h3>
                <FluentProvider key={configProp} {...providerConfig}>
                  {storyFn(context)}
                </FluentProvider>
                <hr />
              </React.Fragment>
            );
          })}
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
