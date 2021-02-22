import { setAddon } from '@storybook/react';
import { setRTL } from '@fluentui/react/lib/Utilities';

const defaultConfig = {
  rtl: false,
};

/**
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
