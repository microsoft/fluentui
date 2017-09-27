/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { IToggleProps, Toggle } from 'office-ui-fabric-react';

const baseProps: IToggleProps = {
  label: 'Toggle label',
  onText: 'On',
  offText: 'Off'
};

storiesOf('Toggle', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
      }
    >
      { story() }
    </Screener>
  ))
  .add('Checked', () => (
    <Toggle
      { ...baseProps }
      defaultChecked={ true }
    />))
  .add('Unchecked', () => (
    <Toggle
      { ...baseProps }
      defaultChecked={ false }
    />))
  .add('Disabled checked', () => (
    <Toggle
      { ...baseProps }
      defaultChecked={ true }
      disabled={ true }
    />))
  .add('Disabled unhecked', () => (
    <Toggle
      { ...baseProps }
      defaultChecked={ false }
      disabled={ true }
    />));