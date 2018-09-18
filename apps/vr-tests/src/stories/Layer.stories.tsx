/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Layer } from 'office-ui-fabric-react';

const LayerDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.ms-Layer' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const layerStories = {
  decorators: [FabricDecorator, LayerDecorator],
  stories: {
    'Root test': () => <Layer>Layer content</Layer>
  }
};

runStories('Layer', layerStories);