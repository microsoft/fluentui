/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { ColorPicker } from 'office-ui-fabric-react';

const ScreenerDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const allStories = [
  {
    decorators: [FabricDecorator, ScreenerDecorator],
    stories: {
      'Root': () => <ColorPicker color='#FFF' />,
      'Blue': () => <ColorPicker color='#48B' />
    }
  }
];

runStories('ColorPicker', allStories);