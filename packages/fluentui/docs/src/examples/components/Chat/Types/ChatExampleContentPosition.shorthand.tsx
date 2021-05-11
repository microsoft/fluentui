import * as React from 'react';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const [robinAvatar, timAvatar] = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
].map(src => ({
  image: src,
  status: { color: 'green', icon: <AcceptIcon /> },
}));

const items: ShorthandCollection<ChatItemProps> = [
  {
    contentPosition: 'start',
    gutter: <Avatar {...timAvatar} />,
    message: <Chat.Message content="Hello" author="Tim Deboer" timestamp="Yesterday, 10:15 PM" />,
    key: 'message-id-1',
  },
  {
    contentPosition: 'end',
    gutter: <Avatar {...robinAvatar} />,
    message: <Chat.Message content="Hi" author="Robin Counts" timestamp="Yesterday, 10:15 PM" mine />,
    key: 'message-id-2',
  },
];

const ChatExampleContentPosition = () => <Chat items={items} />;

export default ChatExampleContentPosition;
