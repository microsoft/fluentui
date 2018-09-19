/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { setRTL } from 'office-ui-fabric-react/lib/Utilities';

setOptions({
  name: 'Fabric'
});

const req = require.context('../src/stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

storybook.setAddon({
  addStory(storyName, storyFn, rafFn) {
    this.add(storyName, context => {
      setRTL(false);
      return storyFn(context);
    });

    this.add(storyName + ' - RTL', context => {
      setRTL(true);
      return storyFn(context);
    });
  }
});

storiesOf('A_Component', module)
  .addDecorator(story => <div style={{ border: '1px solid red' }}>{story()}</div>)
  .addStory('Configured Story', () => <div>My configured story</div>)
  .add('Default Story', () => <div>My ordinary story</div>);

storybook.configure(loadStories, module);
