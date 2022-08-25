import * as React from 'react';
import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection, Tooltip } from '@fluentui/react-northstar';

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
        timestamp={{
          content: '10:15 PM',
          children: (Component, props) => (
            <Tooltip content="Yesterday at 10:15 PM" trigger={<Component {...props} />} />
          ),
        }}
      />
    ),
    key: 'message-id-1',
  },
];

export const ChatRefreshTimestampTooltip = () => <Chat items={items} />;
