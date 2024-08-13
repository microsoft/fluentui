import * as React from 'react';
import { Steps } from 'storywright';
import { TestWrapperDecorator, StoryWrightDecorator } from '../../utilities';
import { Fabric, SpinButton, ISpinButtonProps, TextField, ITextFieldStyles } from '@fluentui/react';
import { Position } from '@fluentui/react/lib/Positioning';

const props: ISpinButtonProps = {
  defaultValue: '0',
  label: 'Basic SpinButton:',
  min: 0,
  max: 0,
  step: 1,
};

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { width: 250, display: 'inline-block' },
};

const iconProps = { iconName: 'IncreaseIndentLegacy' };

export default {
  title: 'SpinButton',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const LabelOnTop = () => (
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
);

LabelOnTop.storyName = 'Label on top';

export const LabelOnTopWithIcon = () => (
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
);

LabelOnTopWithIcon.storyName = 'Label on top with icon';
