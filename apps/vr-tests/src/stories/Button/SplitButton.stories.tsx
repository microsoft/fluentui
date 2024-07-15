import * as React from 'react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  RTL,
  StoryWrightDecorator,
  TestWrapperDecoratorTall,
} from '../../utilities';
import { DefaultButton, IButtonProps, CommandBarButton } from '@fluentui/react/lib/Button';

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
  title: 'Button Split (compat)',

  decorators: [
    TestWrapperDecoratorTall,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button:nth-child(1)')
        .snapshot('hover main', { cropTo: '.testWrapper' })
        .hover('.ms-Button:nth-child(2)')
        .snapshot('hover split', { cropTo: '.testWrapper' })
        // .mouseDown('.ms-Button:nth-child(1)')
        // .snapshot('pressed main', { cropTo: '.testWrapper' })
        // .hover('.ms-Button') // reset mouseDown
        // .mouseUp('.ms-Button:nth-child(2)')
        // .mouseDown('.ms-Button:nth-child(2)')
        // .snapshot('pressed split', { cropTo: '.testWrapper' })
        // .click('.ms-Button:nth-child(2)')
        // .hover('.ms-Button') // move mouse to make click work
        // .snapshot('open', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
};

export const Root = () => <DefaultButton {...commandProps} split={true} />;

export const RootRTL = getStoryVariant(Root, RTL);

export const Disabled = () => <DefaultButton {...commandProps} disabled={true} split={true} />;

export const DefaultWithPrimaryActionDisabled = () => (
  <DefaultButton {...commandProps} primaryDisabled={true} split={true} />
);

DefaultWithPrimaryActionDisabled.storyName = 'Default with Primary Action Disabled';

export const Checked = () => <DefaultButton {...commandProps} checked={true} split={true} />;
export const __Primary = () => <DefaultButton {...commandProps} primary={true} split={true} />;

export const __PrimaryDisabled = () => (
  <DefaultButton {...commandProps} primary={true} disabled={true} split={true} />
);

export const PrimaryWithPrimaryActionDisabled = () => (
  <DefaultButton {...commandProps} primaryDisabled={true} primary={true} split={true} />
);

PrimaryWithPrimaryActionDisabled.storyName = 'Primary with Primary Action Disabled';

export const __PrimaryChecked = () => (
  <DefaultButton {...commandProps} primary={true} checked={true} split={true} />
);

export const CommandSplit = () => <CommandBarButton {...commandProps} split={true} />;
