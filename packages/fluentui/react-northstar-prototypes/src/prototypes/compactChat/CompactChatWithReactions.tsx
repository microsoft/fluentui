import * as React from 'react';

import {
  Avatar,
  Chat,
  ChatItemProps,
  EmojiIcon,
  LikeIcon,
  MoreIcon,
  ShorthandCollection,
} from '@fluentui/react-northstar';

import { robinAvatar, timAvatar } from './compactAvatars';

const reactions = [
  {
    key: 'up',
    icon: <LikeIcon />,
    content: '1K',
  },
  {
    key: 'smile',
    icon: <EmojiIcon />,
    content: 5,
  },
];

const actionMenu = {
  iconOnly: true,
  items: [
    {
      key: 'like',
      icon: <LikeIcon />,
      title: 'Like',
    },
    {
      key: 'smile',
      icon: <EmojiIcon />,
      title: 'Smile',
    },
    {
      key: 'more',
      icon: <MoreIcon />,
      title: 'More actions',
    },
  ],
};

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: <Chat.Message content="Message with actions" author="Tim" timestamp="11:21" actionMenu={actionMenu} />,
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...robinAvatar} size="smallest" />,
    message: (
      <Chat.Message
        content="Message with reactions"
        author="Robin"
        mine
        timestamp="11:21"
        reactionGroup={reactions}
        actionMenu={actionMenu}
      />
    ),
    key: 'message-id-2',
  },
];

export const CompactChatWithReactions = () => <Chat compact items={items} />;
