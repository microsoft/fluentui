import * as React from 'react';
import { ThreadReplyProps } from './ThreadReplies';
import {
  AcceptIcon,
  BoldIcon,
  CalendarIcon,
  ItalicIcon,
  LikeIcon,
  MoreIcon,
  UnderlineIcon,
  EmojiIcon,
  FilesImageIcon,
} from '@fluentui/react-icons-northstar';

export const actionMenu = {
  iconOnly: true,
  items: [
    {
      key: 'like',
      icon: <LikeIcon />,
      title: 'Like',
    },
    {
      key: 'more',
      icon: <MoreIcon />,
      title: 'More actions',
    },
  ],
};

export const robinAvatar = {
  image: 'public/images/avatar/RobinCounts.jpg',
  status: {
    color: 'green',
    icon: <AcceptIcon />,
  },
};

export const replies: ThreadReplyProps[] = [
  {
    avatar: robinAvatar,
    content: "Sure! Let's do it",
    author: 'Robin Counts',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: robinAvatar,
    content: (
      <div>
        Amazing idea! What do you think about this place <a href="/">Letna beer garden</a>?
      </div>
    ),
    author: 'Robin Counts',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: robinAvatar,
    content: 'I am for any place!',
    author: 'Robin Counts',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: robinAvatar,
    content: 'Yay! Finally party!',
    author: 'Robin Counts',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
];

export const toolbarItems = [
  {
    key: 'bold',
    icon: <BoldIcon outline />,
  },
  {
    key: 'italic',
    icon: <ItalicIcon outline />,
  },
  {
    key: 'underline',
    icon: <UnderlineIcon outline />,
  },
  {
    key: 'smile',
    icon: <EmojiIcon outline />,
  },
  {
    key: 'picture',
    icon: <FilesImageIcon outline />,
  },
  {
    key: 'calendar',
    icon: <CalendarIcon outline />,
  },
];
