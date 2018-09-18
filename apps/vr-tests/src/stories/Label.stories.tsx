/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Label, ILabelProps } from 'office-ui-fabric-react';

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

const labelStories = {
  decorators: [FabricDecorator, ScreenerDecorator],
  stories: {
    'Root': () => <Label>I'm a label</Label>,
    'Disabled': () => <Label disabled>I'm a disabled label</Label>,
    'Required': () => <Label required>I'm a required label</Label>
  }
};

runStories('Label', labelStories);