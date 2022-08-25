import * as React from 'react';
import { AcceptIcon, TranslationIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';

const items: ShorthandCollection<ChatItemProps> = [
  {
    v2: true,
    contentPosition: 'start',
    gutter: (
      <Avatar
        image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg"
        status={{ color: 'green', icon: <AcceptIcon /> }}
      />
    ),
    message: (
      <Chat.Message
        v2
        content="Hello"
        author="Robin Counts"
        timestamp="10:15 PM"
        details={
          <>
            Edited <TranslationIcon size="small" />
          </>
        }
      />
    ),
    key: 'message-id-1',
  },
  {
    v2: true,
    contentPosition: 'end',
    message: (
      <Chat.Message
        v2
        mine
        content="Hi"
        author="Tim Deboer"
        timestamp="10:15 PM"
        details={
          <>
            Edited <TranslationIcon size="small" />
          </>
        }
      />
    ),
    key: 'message-id-2',
  },
];

export const ChatRefreshSimple = () => <Chat items={items} />;
