import * as React from 'react';

import { EyeFriendlierIcon, PresenceAvailableIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';

import { robinAvatar, timAvatar } from './compactAvatars';

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...robinAvatar} />,
    message: <Chat.Message content="Old read message" author="Robin Counts" timestamp="10:15" mine />,
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...timAvatar} />,
    message: <Chat.Message content="Old reply" author="Tim Deboer" timestamp="10:16" />,
    key: 'message-id-2',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="Most recent read message spanning multiple lines. The quick brown fox jumps over the lazy dog. Portez ce vieux whisky au juge blond qui fume. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Nechť již hříšné saxofony ďáblů rozezvučí síň úděsnými tóny waltzu, tanga a quickstepu."
        author="Robin Counts"
        timestamp="10:17"
        mine
        readStatus={{
          title: 'Read',
          content: <EyeFriendlierIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-3',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="Sent message"
        author="Robin Counts"
        timestamp="10:21"
        mine
        readStatus={{
          title: 'Sent',
          content: <PresenceAvailableIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-4',
  },
];

export const CompactChatWithReadReceipts = () => <Chat density="compact" items={items} />;
