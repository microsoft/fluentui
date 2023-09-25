import * as React from 'react';

import { MentionIcon, RedbangIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection, Text } from '@fluentui/react-northstar';

import { robinAvatar, timAvatar } from './compactAvatars';

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content={
          <>
            {'Hi '}
            <Text atMention="me" content="Tim" />
            {'!'}
          </>
        }
        author="Robin Counts"
        timestamp="10:20"
        mine
        badge={{
          icon: <MentionIcon />,
        }}
        variables={{
          hasMention: true,
        }}
      />
    ),
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...timAvatar} />,
    message: <Chat.Message content="Hey" author="Tim Deboer" timestamp="10:21" />,
    key: 'message-id-2',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="Please look into this as soon as possible"
        author="Robin Counts"
        timestamp="10:22"
        mine
        badge={{
          icon: <RedbangIcon />,
        }}
        variables={{
          isImportant: true,
        }}
      />
    ),
    key: 'message-id-3',
  },
];

export const CompactChatWithBadges = () => <Chat density="compact" items={items} />;
