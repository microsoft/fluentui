/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecoratorFixedWidth, runStories } from '../utilities';
import { SpinButton } from 'office-ui-fabric-react';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';

const props = {
  defaultValue: '0',
  label: 'Basic SpinButton:',
  min: 0,
  max: 0,
  step: 1
};

const SpinButtonDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .hover('.ms-spinButton-input')
      .snapshot('hover input', { cropTo: '.testWrapper' })
      .click('.ms-spinButton-input')
      .hover('.ms-spinButton-input')
      .snapshot('click input', { cropTo: '.testWrapper' })
      .hover('.ms-Button-flexContainer')
      .snapshot('hover arrow', { cropTo: '.testWrapper' })
      .mouseDown('.ms-Button-flexContainer')
      .snapshot('mouseDown arrow', { cropTo: '.testWrapper' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const spinButtonStories = {
  decorators: [FabricDecoratorFixedWidth, SpinButtonDecorator],
  stories: {
    'Root': () => <SpinButton {...props} />,
    'Disabled': () => <SpinButton {...props} disabled />,
    'With icon': () => <SpinButton {...props} iconProps={{ iconName: 'IncreaseIndentLegacy' }} />,
    'Label at end': () => <SpinButton {...props} labelPosition={Position.end} />
  }
};

runStories('SpinButton', spinButtonStories);