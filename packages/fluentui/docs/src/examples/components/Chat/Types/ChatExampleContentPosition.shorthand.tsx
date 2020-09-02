import * as React from 'react';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const [janeAvatar, johnAvatar] = ['public/images/avatar/small/ade.jpg', 'public/images/avatar/small/joe.jpg'].map(
  src => ({
    image: src,
    status: { color: 'green', icon: <AcceptIcon /> },
  }),
);

const items: ShorthandCollection<ChatItemProps> = [
  {
    contentPosition: 'start',
    gutter: <Avatar {...johnAvatar} />,
    message: <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" />,
    key: 'message-id-1',
  },
  {
    contentPosition: 'end',
    gutter: <Avatar {...janeAvatar} />,
    message: <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" mine />,
    key: 'message-id-2',
  },
];

const ChatExampleContentPosition = () => <Chat items={items} />;

export default ChatExampleContentPosition;
