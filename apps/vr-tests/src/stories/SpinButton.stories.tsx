import * as React from 'react';
import { Steps } from 'storywright';
import {
  TestWrapperDecoratorFixedWidth,
  StoryWrightDecorator,
  getStoryVariant,
  STORY_VARIANT,
} from '../utilities';
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

export default {
  title: 'SpinButton',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

const steps = new Steps()
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
  .end();

export const Root = () => (
  <Fabric>
    <SpinButton {...props} />
  </Fabric>
);
Root.parameters = { steps };

export const Disabled = () => (
  <Fabric>
    <SpinButton {...props} disabled />
  </Fabric>
);
Disabled.parameters = { steps };

export const WithIcon = () => (
  <Fabric>
    <SpinButton {...props} iconProps={iconProps} />
  </Fabric>
);
WithIcon.parameters = { steps };

WithIcon.storyName = 'With icon';

export const WithIconRTL = getStoryVariant(WithIcon, STORY_VARIANT.RTL);

// const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();

export const LabelAtEnd = () => (
  <Fabric>
    <SpinButton {...props} styles={styles} labelPosition={Position.end} />
  </Fabric>
);

LabelAtEnd.storyName = 'Label at end';

export const LabelAtEndRTL = getStoryVariant(LabelAtEnd, STORY_VARIANT.RTL);

export const LabelAtEndWithIcon = () => (
  <Fabric>
    <SpinButton {...props} styles={styles} labelPosition={Position.end} iconProps={iconProps} />
  </Fabric>
);

LabelAtEndWithIcon.storyName = 'Label at end with icon';

export const LabelAtEndWithIconRTL = getStoryVariant(LabelAtEndWithIcon, STORY_VARIANT.RTL);

export const LabelOnBottom = () => (
  <Fabric>
    <SpinButton {...props} styles={styles} labelPosition={Position.bottom} />
  </Fabric>
);

LabelOnBottom.storyName = 'Label on bottom';

export const LabelOnBottomWithIcon = () => (
  <Fabric>
    <SpinButton {...props} styles={styles} labelPosition={Position.bottom} iconProps={iconProps} />
  </Fabric>
);

LabelOnBottomWithIcon.storyName = 'Label on bottom with icon';

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
LabelOnTop.parameters = { testWrapperStyles: { width: 'auto' } };

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
LabelOnTopWithIcon.parameters = { testWrapperStyles: { width: 'auto' } };
