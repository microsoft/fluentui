import * as React from 'react';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import { AcceptIcon, TranslationIcon } from '@fluentui/react-icons-northstar';

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
    contentPosition: 'end',
    gutter: (
      <Avatar
        image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg"
        status={{ color: 'green', icon: <AcceptIcon /> }}
      />
    ),
    message: (
      <Chat.Message
        content="Hi"
        author="Robin Counts"
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
];

const ChatExampleDetails = () => <Chat items={items} />;

export default ChatExampleDetails;
