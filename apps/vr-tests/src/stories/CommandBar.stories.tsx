import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecoratorTall } from '../utilities';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react';

const items: ICommandBarItemProps[] = [
  {
    key: 'newItem',
    text: 'New',
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          iconProps: { iconName: 'Mail' },
        },
        {
          key: 'calendarEvent',
          text: 'Calendar event',
          iconProps: { iconName: 'Calendar' },
        },
      ],
    },
  },
  {
    key: 'upload',
    text: 'Upload',
    iconProps: { iconName: 'Upload' },
  },
  {
    key: 'share',
    text: 'Share',
    iconProps: { iconName: 'Share' },
  },
  {
    key: 'download',
    text: 'Download',
    iconProps: { iconName: 'Download' },
  },
  {
    key: 'disabled',
    text: 'Disabled...',
    iconProps: { iconName: 'Cancel' },
    disabled: true,
  },
];

const farItems: ICommandBarItemProps[] = [
  {
    key: 'sort',
    text: 'Sort',
    iconProps: { iconName: 'SortLines' },
  },
  {
    key: 'tile',
    text: 'Grid view',
    iconProps: { iconName: 'Tiles' },
  },
  {
    key: 'info',
    text: 'Info',
    iconProps: { iconName: 'Info' },
  },
];

export default {
  title: 'CommandBar',

  decorators: [
    TestWrapperDecoratorTall,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-CommandBarItem-link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-CommandBarItem-link')
        .hover('.ms-CommandBarItem-link')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
};

export const Root = () => <CommandBar items={items} farItems={farItems} />;

export const RootRTL = getStoryVariant(Root, RTL);

export const TextOnly = () => (
  <CommandBar
    items={items.map(item => ({ ...item, iconProps: undefined }))}
    farItems={farItems.map(item => ({ ...item, iconProps: undefined }))}
  />
);

TextOnly.storyName = 'Text only';

export const IconsOnly = () => (
  <CommandBar
    items={items.map(item => ({ ...item, text: undefined }))}
    farItems={farItems.map(item => ({ ...item, iconOnly: true }))}
  />
);

IconsOnly.storyName = 'Icons only';
