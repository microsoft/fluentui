/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from './index';
import { Label, ILabelProps } from 'office-ui-fabric-react';

storiesOf('Label', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener>
      { story() }
    </Screener>
  ))
  .add('Root', () => (<Label>I'm a label</Label>))
  .add('Disabled', () => (<Label disabled>I'm a disabled label</Label>))
  .add('Required', () => (<Label required>I'm a required label</Label>));