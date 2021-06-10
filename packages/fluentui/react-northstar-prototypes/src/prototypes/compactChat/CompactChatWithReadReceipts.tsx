import * as React from 'react';

import {
  Avatar,
  Chat,
  ChatItemProps,
  EyeFriendlierIcon,
  PresenceAvailableIcon,
  ShorthandCollection,
} from '@fluentui/react-northstar';

import { robinAvatar, timAvatar } from './compactAvatars';

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...robinAvatar} />,
    message: <Chat.Message content="Old read message" author="Robin" timestamp="10:15" mine />,
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...timAvatar} />,
    message: <Chat.Message content="Old reply" author="Tim" timestamp="10:16" />,
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="Most recent read message spanning multiple lines. I can help you with the rollout plan for EMEA. I have been working closely this week with the local team to get the timings from the external AD agency and media buying team. I can help you with the rollout plan for EMEA as I've been working closely this week with the local marketing team to the get the timings from the external AD agency and media buying team."
        author="Robin"
        timestamp="10:17"
        mine
        readStatus={{
          title: 'Read',
          content: <EyeFriendlierIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-2',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="Sent message"
        author="Robin"
        timestamp="10:21"
        mine
        readStatus={{
          title: 'Sent',
          content: <PresenceAvailableIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-3',
  },
];

export const CompactChatWithReadReceipts = () => <Chat compact items={items} />;
