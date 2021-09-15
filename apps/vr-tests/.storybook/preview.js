// @ts-check
import * as React from 'react';
import { setAddon } from '@storybook/react';
import { setRTL } from '@fluentui/react/lib/Utilities';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';

const defaultConfig = {
  includeRtl: false,
};

/**
 *
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
 * The config parameter can be used to add the story RTL
 *  in addition to LTR.
 * In future, this can add a story with additional configurations
 *  such as theming.
 */
setAddon({
  addStory(storyName, storyFn, config = defaultConfig) {
    // V-Next stories
    if (this.kind.includes('Converged') || config.provider === 'FluentProvider') {
      this.add(storyName, context => {
        return <FluentProvider theme={webLightTheme}>{storyFn({ context })}</FluentProvider>;
      });
      if (config.includeRtl) {
        this.add(storyName + ' - RTL', context => {
          return (
            <FluentProvider theme={webLightTheme} dir="rtl">
              {storyFn({ context })}
            </FluentProvider>
          );
        });
      }
    }
    // Other stories
    else {
      this.add(storyName, context => {
        setRTL(false);
        return storyFn(context);
      });
      if (config.includeRtl) {
        this.add(storyName + ' - RTL', context => {
          setRTL(true);
          return storyFn(context);
        });
      }
    }

    return this;
  },
});

export const parameters = { layout: 'none' };

// For static storybook per https://github.com/screener-io/screener-storybook#testing-with-static-storybook-app
if (typeof window === 'object') {
  /** @type {*} */ (window).__screener_storybook__ = require('@storybook/react').getStorybook;
}
