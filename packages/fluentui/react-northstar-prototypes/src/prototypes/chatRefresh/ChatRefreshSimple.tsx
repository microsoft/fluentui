import * as React from 'react';
import { AcceptIcon, TranslationIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';

const items: ShorthandCollection<ChatItemProps> = [
  {
    unstable_layout: 'refresh',
    contentPosition: 'start',
    gutter: (
      <Avatar
        image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg"
        status={{ color: 'green', icon: <AcceptIcon /> }}
      />
    ),
    message: (
      <Chat.Message
        unstable_layout="refresh"
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
    unstable_layout: 'refresh',
    contentPosition: 'end',
    message: (
      <Chat.Message
        unstable_layout="refresh"
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
