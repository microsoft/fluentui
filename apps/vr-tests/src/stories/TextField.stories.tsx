/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { TextField } from 'office-ui-fabric-react';

storiesOf('TextField', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-TextField-field')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-TextField-field')
        .hover('.ms-TextField-field')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Root', () => (
    <TextField
      label='Standard'
    />
  )).add('Placeholder', () => (
    <TextField
      label='Standard'
      placeholder='Placeholder'
    />
  )).add('Disabled', () => (
    <TextField
      label='Disabled'
      disabled
    />
  )).add('Required', () => (
    <TextField
      label='Required'
      required
    />
  )).add('Error', () => (
    <TextField
      label='Error'
      errorMessage='Error message'
    />
  )).add('Multiline', () => (
    <TextField
      label='Multiline'
      multiline
      rows={ 4 }
    />
  )).add('Multiline nonresizable', () => (
    <TextField
      label='Multiline'
      multiline
      rows={ 4 }
      resizable={ false }
    />
  )).add('Underlined', () => (
    <TextField
      label='Underlined'
      underlined
    />
  )).add('Borderless', () => (
    <TextField
      label='Borderless'
      borderless
      placeholder='Placeholder text'
    />
  )).add('Icon', () => (
    <TextField
      label='Icon'
      iconProps={ { iconName: 'Calendar' } }
    />
  )).add('Addon', () => (
    <TextField
      label='Addon'
      addonString='https://'
    />
  ));