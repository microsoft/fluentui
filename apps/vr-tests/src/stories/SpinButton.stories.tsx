/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator, FabricDecoratorFixedWidth } from '../utilities';
import { Fabric, SpinButton, TextField, ISpinButtonProps } from 'office-ui-fabric-react';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';

const props: ISpinButtonProps = {
  defaultValue: '0',
  label: 'Basic SpinButton:',
  min: 0,
  max: 0,
  step: 1
};
const styles = { root: { width: 300 } };
const iconProps = { iconName: 'IncreaseIndentLegacy' };

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
        <SpinButton {...props} iconProps={iconProps} />
      </Fabric>
    ),
    { rtl: true }
  );

// The stories for label placement are separate since they don't need to include hover/click states
storiesOf('SpinButton - Label Placement', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory(
    'Label at end',
    () => (
      <Fabric>
        <SpinButton {...props} styles={styles} labelPosition={Position.end} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory(
    'Label at end with icon',
    () => (
      <Fabric>
        <SpinButton {...props} styles={styles} labelPosition={Position.end} iconProps={iconProps} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Label on top', () => (
    <Fabric styles={{ root: { width: 460 } }}>
      <SpinButton {...props} styles={{ root: { width: 150 } }} labelPosition={Position.top} />
      <TextField label="Should vertically align with SpinButton" styles={styles} />
    </Fabric>
  ))
  .addStory('Label on top with icon', () => (
    <Fabric styles={{ root: { width: 460 } }}>
      <SpinButton
        {...props}
        styles={{ root: { width: 150 } }}
        labelPosition={Position.top}
        iconProps={iconProps}
      />
      <TextField label="Should vertically align with SpinButton" styles={styles} />
    </Fabric>
  ))
  .addStory('Label on bottom', () => (
    <Fabric>
      <SpinButton {...props} styles={styles} labelPosition={Position.bottom} />
    </Fabric>
  ))
  .addStory('Label on bottom with icon', () => (
    <Fabric>
      <SpinButton
        {...props}
        styles={styles}
        labelPosition={Position.bottom}
        iconProps={iconProps}
      />
    </Fabric>
  ));
