import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';

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

export const RootRTL = getStoryVariant(Root, RTL);

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
