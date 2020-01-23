/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
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

// Via this addon, we INVENT a new API that automatically adds several stories for you when you call addStory() that adds variants (like RTL)
storybook.setAddon({
  addStory: function(storyName, storyFn, config = defaultConfig) {
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
