import * as React from 'react';
import { Menu, menuAsToolbarBehavior, MenuItemProps, ShorthandCollection } from '@fluentui/react-northstar';

const items: ShorthandCollection<MenuItemProps> = [
  {
    key: 'format',
    icon: {
      name: 'format',
      outline: true,
    },
    'aria-label': 'Format Tool',
  },
  {
    key: 'paperclip',
    icon: {
      name: 'paperclip',
      outline: true,
    },
    'aria-label': 'Paperclip Tool',
  },
  {
    key: 'emoji',
    icon: {
      name: 'emoji',
      outline: true,
    },
    disabled: true,
    'aria-label': 'Emoji Tool',
  },
  {
    key: 'giphy',
    icon: {
      name: 'giphy',
      outline: true,
    },
    'aria-label': 'Giphy tool',
  },
  {
    key: 'sticker',
    icon: {
      name: 'sticker',
      outline: true,
    },
    'aria-label': 'Sticker Tool',
  },
  {
    key: 'meetup',
    icon: {
      name: 'video-camera-emphasis',
      outline: true,
    },
    'aria-label': 'Meetup Tool',
  },
  {
    key: 'settings',
    icon: {
      name: 'settings',
      outline: true,
    },
    'aria-label': 'Settings',
  },
  {
    key: 'menuButton2',
    icon: {
      name: 'more',
      outline: true,
    },
    'aria-label': 'More options',
    indicator: false,
    menu: {
      items: [
        {
          key: '5',
          content: 'item1',
          icon: {
            name: 'bookmark',
            outline: true,
          },
        },
        {
          key: 'divider',
          kind: 'divider',
        },
        {
          key: '6',
          content: 'item2',
          icon: {
            name: 'mark-as-unread',
            outline: true,
          },
        },
        {
          key: '7',
          content: 'item3',
          disabled: true,
          icon: {
            name: 'translation',
            outline: true,
          },
        },
        {
          key: 'divider2',
          kind: 'divider',
        },
        {
          key: '8',
          content: 'item3',
          icon: {
            name: 'trash-can',
            outline: true,
          },
        },
      ],
    },
  },
];

const MenuExampleToolbarShorthand = () => (
  <Menu
    defaultActiveIndex={0}
    items={items}
    iconOnly
    accessibility={menuAsToolbarBehavior}
    aria-label="Compose Editor"
  />
);

export default MenuExampleToolbarShorthand;
