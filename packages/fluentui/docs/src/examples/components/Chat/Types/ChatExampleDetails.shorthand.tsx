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
        content="Hello"
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
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
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        content="Hi"
        author="Tim Deboer"
        timestamp="Yesterday, 10:15 PM"
        details={
          <>
            Edited <TranslationIcon size="small" />
          </>
        }
        mine
      />
    ),
    key: 'message-id-2',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    message: (
      <Chat.Message
        author="Tim Deboer"
        content="How are you doing?"
        details={<>Edited</>}
        mine
        timestamp="Yesterday, 10:16 PM"
      />
    ),
    key: 'message-id-3',
  },
];

const ChatExampleDetails = () => <Chat items={items} />;

export default ChatExampleDetails;
