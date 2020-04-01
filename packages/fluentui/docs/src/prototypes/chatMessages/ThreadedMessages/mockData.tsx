import * as React from 'react';
import { ThreadReplyProps } from './ThreadReplies';
import { AcceptIcon, LikeIcon, MoreIcon } from '@fluentui/react-icons-northstar';

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

export const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: <AcceptIcon />,
  },
};

export const replies: ThreadReplyProps[] = [
  {
    avatar: janeAvatar,
    content: "Sure! Let's do it",
    author: 'Joe Doe',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: janeAvatar,
    content: (
      <div>
        Amazing idea! What do you think about this place <a href="/">Letna beer garden</a>?
      </div>
    ),
    author: 'Jane Doe',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: janeAvatar,
    content: 'I am for any place!',
    author: 'Harry Potter',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: janeAvatar,
    content: 'Yay! Finally party!',
    author: 'Bob Doe',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
];

export const toolbarItems = [
  {
    key: 'bold',
    icon: {
      name: 'bold',
      outline: true,
    },
  },
  {
    key: 'italic',
    icon: {
      name: 'italic',
      outline: true,
    },
  },
  {
    key: 'underline',
    icon: {
      name: 'underline',
      outline: true,
    },
  },
  {
    key: 'smile',
    icon: {
      name: 'smile',
      outline: true,
    },
  },
  {
    key: 'picture',
    icon: {
      name: 'picture',
      outline: true,
    },
  },
  {
    key: 'calendar',
    icon: {
      name: 'calendar',
      outline: true,
    },
  },
];
