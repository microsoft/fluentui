/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFixedWidth } from '../utilities';
import { Fabric, SpinButton } from 'office-ui-fabric-react';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';

const props = {
  defaultValue: '0',
  label: 'Basic SpinButton:',
  min: 0,
  max: 0,
  step: 1
};

storiesOf('SpinButton', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
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
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => (
    <Fabric>
      <SpinButton {...props} />
    </Fabric>
  ))
  .addStory('Disabled', () => (
    <Fabric>
      <SpinButton {...props} disabled />
    </Fabric>
  ))
  .addStory(
    'With icon',
    () => (
      <Fabric>
        <SpinButton {...props} iconProps={{ iconName: 'IncreaseIndentLegacy' }} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory(
    'Label at end',
    () => (
      <Fabric>
        <SpinButton {...props} labelPosition={Position.end} />
      </Fabric>
    ),
    { rtl: true }
  );
