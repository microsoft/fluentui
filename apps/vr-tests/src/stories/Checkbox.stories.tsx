/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Checkbox } from 'office-ui-fabric-react';

storiesOf('Checkbox', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Unchecked', () => (
    <Checkbox
      label='Unchecked checkbox'
    />
  ))
  .add('Checked', () => (
    <Checkbox
      label='Checked checkbox'
      checked
    />
  ))
  .add('Unchecked disabled', () => (
    <Checkbox
      label='Unchecked disabled checkbox'
      disabled
    />
  ))
  .add('Checked disabled', () => (
    <Checkbox
      label='Checked disabled checkbox'
      checked
      disabled
    />
  ))
  .add('End', () => (
    <Checkbox
      label='Checkbox end'
      boxSide='end'
    />
  ));