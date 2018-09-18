/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Overlay } from 'office-ui-fabric-react';

const OverlayDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.ms-Overlay' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const overlayStories = {
  decorators: [FabricDecorator, OverlayDecorator],
  stories: {
    'Root': () => <Overlay>Overlay content</Overlay>,
    'Dark': () => <Overlay isDarkThemed>Overlay content</Overlay>
  }
};

runStories('Overlay', overlayStories);