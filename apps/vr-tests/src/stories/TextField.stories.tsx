/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecoratorFixedWidth, runStories } from '../utilities';
import { TextField } from 'office-ui-fabric-react';

const TextFieldDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .hover('.ms-TextField-field')
      .snapshot('hover', { cropTo: '.testWrapper' })
      .click('.ms-TextField-field')
      .hover('.ms-TextField-field')
      .snapshot('click', { cropTo: '.testWrapper' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const textFieldStories = {
  decorators: [FabricDecoratorFixedWidth, TextFieldDecorator],
  stories: {
    'Root': () => <TextField label="Standard" />,
    'Placeholder': () => <TextField label="Standard" placeholder="Placeholder" />,
    'Disabled': () => <TextField label="Disabled" disabled />,
    'Required': () => <TextField label="Required" required />,
    'Error': () => <TextField label="Error" errorMessage="Error message" />,
    'Multiline': () => <TextField label="Multiline" multiline rows={4} />,
    'Multiline nonresizable': () => <TextField label="Multiline" multiline rows={4} resizable={false} />,
    'Underlined': () => <TextField label="Underlined" underlined />,
    'Borderless': () => <TextField label="Borderless" borderless placeholder="Placeholder text" />,
    'Icon': () => <TextField label="Icon" iconProps={{ iconName: 'Calendar' }} />,
    'Prefix': () => <TextField label="Prefix" prefix="https://" />,
    'Suffix': () => <TextField label="Suffix" suffix=".com" />
  }
};

runStories('TextField', textFieldStories);