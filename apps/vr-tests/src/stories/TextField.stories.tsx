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
  .addStory('Root', () => <TextField label="Standard" />)
  .addStory('Placeholder', () => <TextField label="Standard" placeholder="Placeholder" />, {
    rtl: true
  })
  .addStory('Disabled', () => <TextField label="Disabled" disabled />)
  .addStory('Required', () => <TextField label="Required" required />)
  .addStory('Error', () => <TextField label="Error" errorMessage="Error message" />, { rtl: true })
  .addStory('Multiline', () => <TextField label="Multiline" multiline rows={4} />, { rtl: true })
  .addStory('Multiline nonresizable', () => (
    <TextField label="Multiline" multiline rows={4} resizable={false} />
  ))
  .addStory('Underlined', () => <TextField label="Underlined" underlined />)
  .addStory('Borderless', () => (
    <TextField label="Borderless" borderless placeholder="Placeholder text" />
  ))
  .addStory(
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
  .addStory(
    'Prefix with Value, Disabled, and Prefix Style-Override',
    () => (
      <TextField
        label="Green styled prefix"
        prefix="https://"
        value="example.com"
        styles={{ prefix: { color: 'green' } }}
        disabled
      />
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Prefix with Value, Disabled',
    () => <TextField label="Prefix" prefix="https://" value="example.com" disabled />,
    {
      rtl: true
    }
  )
  .addStory('Suffix', () => <TextField label="Suffix" suffix=".com" />, {
    rtl: true
  });
