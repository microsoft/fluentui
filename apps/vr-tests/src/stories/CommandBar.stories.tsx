import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities/index';
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

storiesOf('CommandBar', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-CommandBarItem-link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-CommandBarItem-link')
        .hover('.ms-CommandBarItem-link')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => <CommandBar items={items} farItems={farItems} />, { rtl: true })
  .addStory('Text only', () => (
    <CommandBar
      items={items.map(item => ({ ...item, iconProps: undefined }))}
      farItems={farItems.map(item => ({ ...item, iconProps: undefined }))}
    />
  ))
  .addStory('Icons only', () => (
    <CommandBar
      items={items.map(item => ({ ...item, text: undefined }))}
      farItems={farItems.map(item => ({ ...item, iconOnly: true }))}
    />
  ));
