import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { CompoundButton, IButtonProps } from '@fluentui/react/lib/Button';

const baseProps: IButtonProps = {
  iconProps: {
    iconName: 'AddFriend',
  },
  children: 'Button',
  secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
};

export default {
  title: 'Button Compound (compat)',

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
};

export const Root = () => <CompoundButton {...baseProps} />;

export const RootRTL = getStoryVariant(Root, RTL);

export const Disabled = () => <CompoundButton {...baseProps} disabled={true} />;

export const Checked = () => <CompoundButton {...baseProps} checked={true} />;

export const Primary = () => <CompoundButton {...baseProps} primary={true} />;

export const PrimaryDisabled = () => (
  <CompoundButton {...baseProps} primary={true} disabled={true} />
);

export const PrimaryChecked = () => <CompoundButton {...baseProps} primary={true} checked={true} />;

export const NoIcon = () => <CompoundButton {...baseProps} iconProps={undefined} />;
