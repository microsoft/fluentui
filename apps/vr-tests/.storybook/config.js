/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { storiesOf } from '@storybook/react';
import { setRTL } from 'office-ui-fabric-react/lib/Utilities';

setOptions({
  name: 'Fabric'
});

const req = require.context('../src/stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const defaultConfig = {
  rtl: false
};

/**
 * Adds a story with different configuration options.
 * By default, only adds a story in LTR.
 * The config parameter can be used to add the story RTL
 *  in addition to LTR.
 * In future, this can add a story with additional configurations
 *  such as theming.
 */
storybook.setAddon({
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
  }
});

storybook.configure(loadStories, module);
