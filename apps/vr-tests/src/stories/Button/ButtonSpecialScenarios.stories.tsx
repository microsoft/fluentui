import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';

const baseProps: IButtonProps = {
  iconProps: {
    iconName: 'AddFriend',
  },
  children: 'Button',
  secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
};

export default {
  title: 'Button Special Scenarios (compat)',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
} satisfies Meta<typeof DefaultButton>;

export const PrimaryWithPlaceholder = () => (
  <div>
    <DefaultButton {...baseProps} iconProps={{ iconName: '' }} primary={true} />
    <br />
    <DefaultButton {...baseProps} iconProps={{ iconName: 'Add' }} primary={true} />
  </div>
);

PrimaryWithPlaceholder.storyName = 'primary with placeholder';

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
