import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

const _items: ICommandBarItemProps[] = [
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
    href: 'https://www.bing.com',
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
];

const _overflowItems: ICommandBarItemProps[] = [
  { key: 'move', text: 'Move to...' },
  { key: 'copy', text: 'Copy to...' },
  { key: 'rename', text: 'Rename...' },
];

const _farItems: ICommandBarItemProps[] = [
  {
    key: 'tile',
    text: 'Grid view',
    iconOnly: true,
    iconProps: { iconName: 'Tiles' },
  },
  {
    key: 'info',
    text: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
  },
];

const Scenario = () => <CommandBar items={_items} overflowItems={_overflowItems} farItems={_farItems} />;

export default Scenario;
