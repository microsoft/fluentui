import * as React from 'react';
import { AcceptIcon, TranslationIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';

const items: ShorthandCollection<ChatItemProps> = [
  {
    key: 'message-id-1',
    unstable_layout: 'refresh',
    contentPosition: 'start',
    gutter: (
      <Avatar
        image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg"
        status={{ color: 'green', icon: <AcceptIcon /> }}
      />
    ),
    message: <Chat.Message unstable_layout="refresh" content="Hello" author="Robin Counts" timestamp="10:15 PM" />,
  },
  {
    key: 'message-id-2',
    unstable_layout: 'refresh',
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        unstable_layout="refresh"
        content="Hi! How are you doing?"
        author="Tim Deboer"
        timestamp="10:15 PM"
        details={
          <>
            Edited <TranslationIcon size="small" />
          </>
        }
        mine
      />
    ),
  },
];

const ChatExampleComfyRefresh = () => <Chat items={items} />;

export default ChatExampleComfyRefresh;
