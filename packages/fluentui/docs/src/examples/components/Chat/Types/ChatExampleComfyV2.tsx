import * as React from 'react';

import { AcceptIcon, TranslationIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';

const items: ShorthandCollection<ChatItemProps> = [
  {
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
        timestampTooltip="Yesterday, 10:15 PM"
      />
    ),
    key: 'message-id-1',
  },
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        v2
        content="Hi"
        author="Tim Deboer"
        timestamp="10:15 PM"
        details={
          <>
            Edited <TranslationIcon size="small" />
          </>
        }
        mine
        timestampTooltip="Yesterday, 10:15 PM"
      />
    ),
    key: 'message-id-2',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    message: (
      <Chat.Message
        v2
        author="Tim Deboer"
        content="How are you doing?"
        details={<>Edited</>}
        mine
        timestamp="10:16 PM"
        timestampTooltip="Yesterday, 10:16 PM"
      />
    ),
    key: 'message-id-3',
  },
];

const ChatExampleComfyV2 = () => <Chat items={items} />;

export default ChatExampleComfyV2;
