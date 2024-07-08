import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  STORY_VARIANT,
  StoryWrightDecorator,
  TestWrapperDecorator,
} from '../utilities';
import { DefaultButton, ActionButton, IButtonProps } from '@fluentui/react/lib/Button';

const baseProps: IButtonProps = {
  iconProps: {
    iconName: 'AddFriend',
  },
  children: 'Button',
  secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
};

export default {
  title: 'Button (compat)',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
} satisfies Meta<typeof DefaultButton>;

export const Root = () => <DefaultButton {...baseProps} />;

export const RootRTL = getStoryVariant(Root, STORY_VARIANT.RTL);

export const Disabled = () => <DefaultButton {...baseProps} disabled={true} />;

export const Checked = () => <DefaultButton {...baseProps} checked={true} />;

export const Primary = () => <DefaultButton {...baseProps} primary={true} />;

export const PrimaryDisabled = () => (
  <DefaultButton {...baseProps} primary={true} disabled={true} />
);
export const PrimaryChecked = () => <DefaultButton {...baseProps} primary={true} checked={true} />;

export const PrimaryAnchor = () => (
  <DefaultButton primary href="http://www.bing.com">
    Button
  </DefaultButton>
);

export const NoIcon = () => <DefaultButton>Button</DefaultButton>;

export const IconOnly = () => <DefaultButton iconProps={baseProps.iconProps} />;

export const ActionButtonDefault = () => <ActionButton {...baseProps} />;

export const ActionButtonDefaultRTL = getStoryVariant(ActionButtonDefault, STORY_VARIANT.RTL);

export const ActionButtonDisabled = () => <ActionButton {...baseProps} disabled={true} />;

export const ActionButtonChecked = () => <ActionButton {...baseProps} checked={true} />;

export const ActionButtonNoIcon = () => <ActionButton>Button</ActionButton>;

export const ActionButtonIconOnly = () => <ActionButton iconProps={baseProps.iconProps} />;

export const PrimaryWithPlaceholder = () => (
  <div>
    <DefaultButton {...baseProps} iconProps={{ iconName: '' }} primary={true} />
    <br />
    <DefaultButton {...baseProps} iconProps={{ iconName: 'Add' }} primary={true} />
  </div>
);

PrimaryWithPlaceholder.storyName = 'primary with placeholder';
PrimaryWithPlaceholder.parameters = {
  steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
};

export const NoFlexShrink = () => (
  <div style={{ width: '300px' }}>
    <DefaultButton
      {...baseProps}
      iconProps={{ iconName: 'Add' }}
      menuIconProps={{}}
      styles={{ root: { width: '100%' } }}
    />
    <DefaultButton
      {...baseProps}
      text="This is a much longer string of text in a constrained space"
      iconProps={{ iconName: 'Add' }}
      menuIconProps={{}}
      styles={{ root: { width: '100%' } }}
    />
  </div>
);

NoFlexShrink.storyName = 'no flex shrink';
NoFlexShrink.parameters = {
  steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
};
