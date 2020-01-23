/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFixedWidth } from '../utilities';
import { TextField } from 'office-ui-fabric-react';

storiesOf('TextField', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-TextField-field')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-TextField-field')
        .hover('.ms-TextField-field')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .add('Root', () => <TextField label="Standard" />)
  .add('Placeholder', () => <TextField label="Standard" placeholder="Placeholder" />, {
    rtl: true
  })
  .add('Disabled', () => <TextField label="Disabled" disabled />)
  .add('Required', () => <TextField label="Required" required />)
  .add('Error', () => <TextField label="Error" errorMessage="Error message" />, { rtl: true })
  .add('Multiline', () => <TextField label="Multiline" multiline rows={4} />, { rtl: true })
  .add('Multiline nonresizable', () => (
    <TextField label="Multiline" multiline rows={4} resizable={false} />
  ))
  .add('Underlined', () => <TextField label="Underlined" underlined />)
  .add('Borderless', () => (
    <TextField label="Borderless" borderless placeholder="Placeholder text" />
  ))
  .add(
    'Icon',
    () => (
      <TextField
        styles={{ icon: { color: 'green' } }}
        label="Green styled icon"
        iconProps={{ iconName: 'Calendar' }}
      />
    ),
    {
      rtl: true
    }
  )
  .add(
    'Prefix with Value, Disabled, and Prefix Style-Override',
    () => (
      <TextField
        label="Green styled prefix"
        prefix="https://"
        defaultValue="example.com"
        styles={{ prefix: { color: 'green' } }}
        disabled
      />
    ),
    {
      rtl: true
    }
  )
  .add(
    'Prefix with Value, Disabled',
    () => <TextField label="Prefix" prefix="https://" defaultValue="example.com" disabled />,
    {
      rtl: true
    }
  )
  .add('Suffix', () => <TextField label="Suffix" suffix=".com" />, {
    rtl: true
  });
