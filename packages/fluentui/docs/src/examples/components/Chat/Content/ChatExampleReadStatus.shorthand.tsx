import * as React from 'react';

import { EyeFriendlierIcon, PresenceAvailableIcon } from '@fluentui/react-icons-northstar';
import { Chat, ChatProps } from '@fluentui/react-northstar';

const items: ChatProps['items'] = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        content="Hello"
        author="Cecil Folk"
        timestamp="Yesterday, 10:15 PM"
        readStatus={{
          title: 'Read by All',
          content: <EyeFriendlierIcon size="small" />,
        }}
        mine
      />
    ),
    key: 'message-1',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    key: 'message-2',
    message: (
      <Chat.Message
        content="I'm back!"
        author="Cecil Folk"
        timestamp="Yesterday, 10:15 PM"
        readStatus={{
          title: 'Sent',
          content: <PresenceAvailableIcon size="small" />,
        }}
        mine
      />
    ),
  },
];

const ChatExampleReadStatus = () => <Chat items={items} />;

export default ChatExampleReadStatus;
