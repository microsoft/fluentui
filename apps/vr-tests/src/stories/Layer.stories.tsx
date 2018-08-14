/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Layer } from 'office-ui-fabric-react';

storiesOf('Layer', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Layer' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <Layer>Layer content</Layer>
  ));