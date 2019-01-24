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
  .addStory('Placeholder', () => <TextField label="Standard" placeholder="Placeholder" />, { rtl: true })
  .addStory('Disabled', () => <TextField label="Disabled" disabled />)
  .addStory('Required', () => <TextField label="Required" required />)
  .addStory('Error', () => <TextField label="Error" errorMessage="Error message" />, { rtl: true })
  .addStory('Multiline', () => <TextField label="Multiline" multiline rows={4} />, { rtl: true })
  .addStory('Multiline nonresizable', () => <TextField label="Multiline" multiline rows={4} resizable={false} />)
  .addStory('Underlined', () => <TextField label="Underlined" underlined />)
  .addStory('Borderless', () => <TextField label="Borderless" borderless placeholder="Placeholder text" />)
  .addStory('Icon', () => <TextField styles={{ icon: { color: '#333333' } }} label="Icon" iconProps={{ iconName: 'Calendar' }} />, {
    rtl: true
  })
  .addStory(
    'Prefix',
    () => (
      <TextField label="Prefix" prefix="https://" styles={{ prefix: { color: '#666666', fontFamily: 'Segoe UI', fontSize: '14px' } }} />
    ),
    {
      rtl: true
    }
  )
  .addStory(
    'Suffix',
    () => <TextField label="Suffix" suffix=".com" styles={{ suffix: { color: '#666666', fontFamily: 'Segoe UI', fontSize: '14px' } }} />,
    {
      rtl: true
    }
  );
