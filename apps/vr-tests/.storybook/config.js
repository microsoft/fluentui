
if (typeof window === 'object' && window.navigator && (/node\.js/i).test(window.navigator.userAgent)) {
  let addons = require('@storybook/addons').default;
  let Channel = require('@storybook/channels').default;
  addons.setChannel(new Channel({
    transport: {
      setHandler: function() {},
      send: function() {}
    }
  }));
}

/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'Fabric'
});

const req = require.context('../src/stories', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

storybook.configure(loadStories, module);



if (typeof window === 'object') {
  window.__screener_storybook__ = require('@storybook/react').getStorybook();
}
