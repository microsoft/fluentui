/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFixedWidth } from '../utilities';
import { TextField, Fabric } from 'office-ui-fabric-react';

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
  .addStory('Root', () => (
    <Fabric>
      <TextField label="Standard" />
    </Fabric>
  ))
  .addStory(
    'Placeholder',
    () => (
      <Fabric>
        <TextField label="Standard" placeholder="Placeholder" />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Disabled', () => (
    <Fabric>
      <TextField label="Disabled" disabled />
    </Fabric>
  ))
  .addStory('Required', () => (
    <Fabric>
      <TextField label="Required" required />
    </Fabric>
  ))
  .addStory(
    'Error',
    () => (
      <Fabric>
        <TextField label="Error" errorMessage="Error message" />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory(
    'Multiline',
    () => (
      <Fabric>
        <TextField label="Multiline" multiline rows={4} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Multiline nonresizable', () => (
    <Fabric>
      <TextField label="Multiline" multiline rows={4} resizable={false} />
    </Fabric>
  ))
  .addStory('Underlined', () => (
    <Fabric>
      <TextField label="Underlined" underlined />
    </Fabric>
  ))
  .addStory('Borderless', () => (
    <Fabric>
      <TextField label="Borderless" borderless placeholder="Placeholder text" />
    </Fabric>
  ))
  .addStory(
    'Icon',
    () => (
      <Fabric>
        <TextField
          styles={{ icon: { color: '#333333' } }}
          label="Icon"
          iconProps={{ iconName: 'Calendar' }}
        />
      </Fabric>
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Prefix',
    () => (
      <Fabric>
        <TextField
          label="Prefix"
          prefix="https://"
          styles={{ prefix: { color: '#666666', fontFamily: 'Segoe UI', fontSize: '14px' } }}
        />
      </Fabric>
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Suffix',
    () => (
      <Fabric>
        <TextField
          label="Suffix"
          suffix=".com"
          styles={{ suffix: { color: '#666666', fontFamily: 'Segoe UI', fontSize: '14px' } }}
        />
      </Fabric>
    ),
    {
      rtl: true
    }
  );
