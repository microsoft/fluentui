import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  RTL,
  StoryWrightDecorator,
  TestWrapperDecoratorTall,
} from '../../utilities';
import { IButtonProps, CommandBarButton } from '@fluentui/react/lib/Button';

const commandProps: IButtonProps = {
  iconProps: { iconName: 'Add' },
  text: 'Create account',
  onClick: () => alert('Clicked'),
  menuProps: {
    items: [
      {
        key: 'emailMessage',
        text: 'Email message',
        iconProps: {
          iconName: 'Mail',
        },
      },
      {
        key: 'calendarEvent',
        text: 'Calendar event',
        iconProps: {
          iconName: 'Calendar',
        },
      },
    ],
  },
};

export default {
  title: 'Button Command (compat)',

  decorators: [
    story => (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>{story()}</div>
    ),
    TestWrapperDecoratorTall,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .click('.ms-Button')
        .hover('.ms-Button')
        .snapshot('open', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
} satisfies Meta<typeof CommandBarButton>;

export const Root = () => <CommandBarButton {...commandProps} />;

export const RootRTL = getStoryVariant(Root, RTL);

export const Disabled = () => <CommandBarButton {...commandProps} disabled={true} />;

export const Checked = () => <CommandBarButton {...commandProps} checked={true} />;
