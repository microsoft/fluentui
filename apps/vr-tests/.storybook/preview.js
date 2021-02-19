// @ts-check
import { createElement } from 'react';
import { setAddon } from '@storybook/react';
import { setRTL } from '@fluentui/react/lib/Utilities';

const defaultConfig = {
  rtl: false,
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
    this.add(storyName, context => {
      setRTL(false);
      return storyFn(context);
    });

    if (config.rtl) {
      this.add(storyName + ' - RTL', context => {
        setRTL(true);
        return storyFn(context);
      });
    }

    return this;
  },
});

/**
 * @type {import('@storybook/react').Meta['decorators']}
 */
export const decorators = [removeCanvasInlineStyles];

/**
 * Temporary solution to remove inline styles injected by new default SB layout (https://storybook.js.org/docs/react/configure/story-layout)
 * TODO - remove this once we migrate to SB 6.1
 * @see https://github.com/storybookjs/storybook/issues/12041#issuecomment-717177177
 * @param {Parameters<import('@storybook/react').Meta['decorators'][number]>[0]} Story
 */
function removeCanvasInlineStyles(Story) {
  document.body.removeAttribute('style');
  return createElement(Story);
}
