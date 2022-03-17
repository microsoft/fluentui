import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorFixedWidth, TestWrapperDecorator } from '../utilities/index';
import {
  Fabric,
  SpinButton,
  TextField,
  ISpinButtonProps,
  ISpinButtonStyles,
  ITextFieldStyles,
} from '@fluentui/react';
import { Position } from '@fluentui/react/lib/Positioning';

const props: ISpinButtonProps = {
  defaultValue: '0',
  label: 'Basic SpinButton:',
  min: 0,
  max: 0,
  step: 1,
};
const styles: Partial<ISpinButtonStyles> = { root: { width: 300 } };
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { width: 250, display: 'inline-block' },
};
const iconProps = { iconName: 'IncreaseIndentLegacy' };

storiesOf('SpinButton', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
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
    { includeRtl: true },
  );

// The stories for label placement are separate since they don't need to include hover/click states
storiesOf('SpinButton', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
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
    { includeRtl: true },
  )
  .addStory(
    'Label at end with icon',
    () => (
      <Fabric>
        <SpinButton {...props} styles={styles} labelPosition={Position.end} iconProps={iconProps} />
      </Fabric>
    ),
    { includeRtl: true },
  )
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

storiesOf('SpinButton', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('Label on top', () => (
    <Fabric>
      <SpinButton
        {...props}
        styles={{ root: { width: 120, display: 'inline-block' } }}
        labelPosition={Position.top}
      />
      {/* DO NOT delete this TextField! It's here to verify that the SpinButton's field and label
        vertically align with other form components (this positioning can get messed up since
        SpinButton's optional icon is 1px larger than the label line height). */}
      <TextField
        label="Should vertically align with SpinButton"
        placeholder="(verify field and label alignment)"
        styles={textFieldStyles}
      />
    </Fabric>
  ))
  .addStory('Label on top with icon', () => (
    <Fabric>
      <SpinButton
        {...props}
        styles={{ root: { width: 150, display: 'inline-block' } }}
        labelPosition={Position.top}
        iconProps={iconProps}
      />
      {/* DO NOT delete this TextField! It's here to verify that the SpinButton's field and label
        vertically align with other form components (this positioning can get messed up since
        SpinButton's optional icon is 1px larger than the label line height). */}
      <TextField
        label="Should vertically align with SpinButton"
        placeholder="(verify field and label alignment)"
        styles={textFieldStyles}
      />
    </Fabric>
  ));
