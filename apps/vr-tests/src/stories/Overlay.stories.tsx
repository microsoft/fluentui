/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Overlay } from 'office-ui-fabric-react';

storiesOf('Overlay', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Overlay' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <Overlay>Overlay content</Overlay>
  ))
  .add('Dark', () => (
    <Overlay isDarkThemed>Overlay content</Overlay>
  ));