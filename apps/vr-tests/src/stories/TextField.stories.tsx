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
  .addStory('Root with Value', () => <TextField label="Standard" value="Lorem ipsum" />)
  .addStory('Placeholder', () => <TextField label="Standard" placeholder="Placeholder" />, {
    rtl: true
  })
  .addStory('Disabled', () => <TextField label="Disabled" disabled />)
  .addStory('Disabled with Value', () => (
    <TextField label="Disabled" value="Lorem ipsum" disabled />
  ))
  .addStory('Required', () => <TextField label="Required" required />)
  .addStory('Required with Value', () => (
    <TextField label="Required" value="Lorem ipsum" required />
  ))
  .addStory('Error', () => <TextField label="Error" errorMessage="Error message" />, { rtl: true })
  .addStory(
    'Error with Value',
    () => <TextField label="Error" value="Lorem ipsum" errorMessage="Error message" />,
    { rtl: true }
  )
  .addStory(
    'Error Disabled',
    () => <TextField label="Error" errorMessage="Error message" disabled />,
    { rtl: true }
  )
  .addStory(
    'Error with Value and Disabled',
    () => <TextField label="Error" value="Lorem ipsum" errorMessage="Error message" disabled />,
    { rtl: true }
  )
  .addStory('Multiline', () => <TextField label="Multiline" multiline rows={4} />, { rtl: true })
  .addStory(
    'Multiline Disabled',
    () => <TextField label="Multiline" multiline rows={4} disabled />,
    { rtl: true }
  )
  .addStory(
    'Multiline with Value',
    () => <TextField label="Multiline" value={'Lorem\nipsum'} multiline rows={4} />,
    { rtl: true }
  )
  .addStory(
    'Multiline with Value and Disabled',
    () => <TextField label="Multiline" value={'Lorem\nipsum'} multiline rows={4} disabled />,
    { rtl: true }
  )
  .addStory('Multiline nonresizable', () => (
    <TextField label="Multiline" multiline rows={4} resizable={false} />
  ))
  .addStory('Multiline nonresizable with Value', () => (
    <TextField label="Multiline" value={'Lorem\nipsum'} multiline rows={4} resizable={false} />
  ))
  .addStory('Multiline nonresizable with Value and Disabled', () => (
    <TextField
      label="Multiline"
      value={'Lorem\nipsum'}
      multiline
      rows={4}
      resizable={false}
      disabled
    />
  ))
  .addStory('Underlined', () => <TextField label="Underlined" underlined />)
  .addStory('Underlined with Value', () => (
    <TextField label="Underlined" value="Lorem ipsum" underlined />
  ))
  .addStory('Underlined with Value and Disabled', () => (
    <TextField label="Underlined" value="Lorem ipsum" underlined disabled />
  ))
  .addStory('Borderless', () => (
    <TextField label="Borderless" borderless placeholder="Placeholder text" />
  ))
  .addStory('Borderless with Value', () => (
    <TextField label="Borderless" value="Lorem ipsum" borderless placeholder="Placeholder text" />
  ))
  .addStory('Borderless with Value and Disabled', () => (
    <TextField
      label="Borderless"
      value="Lorem ipsum"
      borderless
      placeholder="Placeholder text"
      disabled
    />
  ))
  .addStory(
    'Icon',
    () => (
      <TextField
        styles={{ icon: { color: '#333333' } }}
        label="Icon"
        iconProps={{ iconName: 'Calendar' }}
      />
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Icon with Value',
    () => <TextField label="Icon" iconProps={{ iconName: 'Calendar' }} value="Lorem ipsum" />,
    {
      rtl: true
    }
  )
  .addStory(
    'Icon with Value and Disabled',
    () => (
      <TextField label="Icon" iconProps={{ iconName: 'Calendar' }} value="Lorem ipsum" disabled />
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Prefix with Prefix Style-Override',
    () => (
      <TextField
        label="Prefix"
        prefix="https://"
        styles={{ prefix: { color: '#666666', fontFamily: 'Segoe UI', fontSize: '14px' } }}
      />
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Prefix with Value and Prefix Style-Override',
    () => (
      <TextField
        label="Prefix"
        prefix="https://"
        value="example.com"
        styles={{ prefix: { color: '#e22609', fontFamily: 'Segoe UI', fontSize: '14px' } }}
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
        label="Prefix"
        prefix="https://"
        value="example.com"
        styles={{ prefix: { color: '#e22609', fontFamily: 'Segoe UI', fontSize: '14px' } }}
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
  .addStory(
    'Suffix',
    () => (
      <TextField
        label="Suffix"
        suffix=".com"
        styles={{ suffix: { color: '#666666', fontFamily: 'Segoe UI', fontSize: '14px' } }}
      />
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Suffix with Value and Style-Override',
    () => (
      <TextField
        label="Suffix"
        suffix=".com"
        value="example"
        styles={{ suffix: { color: '#e22609', fontFamily: 'Segoe UI', fontSize: '14px' } }}
      />
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Suffix with Value and Disabled',
    () => <TextField label="Suffix" suffix=".com" value="example" disabled />,
    {
      rtl: true
    }
  );
