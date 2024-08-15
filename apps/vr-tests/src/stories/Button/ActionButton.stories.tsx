import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { DefaultButton, ActionButton, IButtonProps } from '@fluentui/react/lib/Button';

const baseProps: IButtonProps = {
  iconProps: {
    iconName: 'AddFriend',
  },
  children: 'Button',
  secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
};

export default {
  title: 'Button Action (compat)',

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

export const Root = () => <ActionButton {...baseProps} />;

export const RootRTL = getStoryVariant(Root, RTL);

export const Disabled = () => <ActionButton {...baseProps} disabled={true} />;

export const Checked = () => <ActionButton {...baseProps} checked={true} />;

export const NoIcon = () => <ActionButton>Button</ActionButton>;

export const IconOnly = () => <ActionButton iconProps={baseProps.iconProps} />;
