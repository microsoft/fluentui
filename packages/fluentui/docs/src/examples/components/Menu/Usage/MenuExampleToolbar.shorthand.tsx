import * as React from 'react';
import { Menu, menuAsToolbarBehavior, MenuItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import {
  FormatIcon,
  PaperclipIcon,
  EmojiIcon,
  GiphyIcon,
  StickerIcon,
  VideoCameraEmphasisIcon,
  SettingsIcon,
  MoreIcon,
  BookmarkIcon,
  TranslationIcon,
  TrashCanIcon,
  MarkAsUnreadIcon,
} from '@fluentui/react-icons-northstar';

const items: ShorthandCollection<MenuItemProps> = [
  {
    icon: (
      <FormatIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'format',
    'aria-label': 'Format Tool',
  },
  {
    icon: (
      <PaperclipIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'paperclip',
    'aria-label': 'Paperclip Tool',
  },
  {
    icon: (
      <EmojiIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'emoji',
    disabled: true,
    'aria-label': 'Emoji Tool',
  },
  {
    icon: (
      <GiphyIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'giphy',
    'aria-label': 'Giphy tool',
  },
  {
    icon: (
      <StickerIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'sticker',
    'aria-label': 'Sticker Tool',
  },
  {
    icon: (
      <VideoCameraEmphasisIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'meetup',
    'aria-label': 'Meetup Tool',
  },
  {
    icon: (
      <SettingsIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'settings',
    'aria-label': 'Settings',
  },
  {
    icon: (
      <MoreIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'menuButton2',
    'aria-label': 'More options',
    indicator: false,
    menu: {
      items: [
        {
          key: '5',
          content: 'item1',
          icon: <BookmarkIcon outline />,
        },
        {
          key: 'divider',
          kind: 'divider',
        },
        {
          key: '6',
          content: 'item2',
          icon: <MarkAsUnreadIcon outline />,
        },
        {
          key: '7',
          content: 'item3',
          disabled: true,
          icon: <TranslationIcon outline />,
        },
        {
          key: 'divider2',
          kind: 'divider',
        },
        {
          key: '8',
          content: 'item3',
          icon: <TrashCanIcon outline />,
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
