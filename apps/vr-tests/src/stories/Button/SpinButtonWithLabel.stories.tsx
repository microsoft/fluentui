import * as React from 'react';
import { Steps } from 'storywright';
import {
  TestWrapperDecoratorFixedWidth,
  StoryWrightDecorator,
  getStoryVariant,
  RTL,
} from '../../utilities';
import { Fabric, SpinButton, ISpinButtonProps, ISpinButtonStyles } from '@fluentui/react';
import { Position } from '@fluentui/react/lib/Positioning';

const props: ISpinButtonProps = {
  defaultValue: '0',
  label: 'Basic SpinButton:',
  min: 0,
  max: 0,
  step: 1,
};
const styles: Partial<ISpinButtonStyles> = { root: { width: 300 } };

const iconProps = { iconName: 'IncreaseIndentLegacy' };

export default {
  title: 'SpinButton',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const LabelAtEnd = () => (
  <Fabric>
    <SpinButton {...props} styles={styles} labelPosition={Position.end} />
  </Fabric>
);

LabelAtEnd.storyName = 'Label at end';

export const LabelAtEndRTL = getStoryVariant(LabelAtEnd, RTL);

export const LabelAtEndWithIcon = () => (
  <Fabric>
    <SpinButton {...props} styles={styles} labelPosition={Position.end} iconProps={iconProps} />
  </Fabric>
);

LabelAtEndWithIcon.storyName = 'Label at end with icon';

export const LabelAtEndWithIconRTL = getStoryVariant(LabelAtEndWithIcon, RTL);

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
