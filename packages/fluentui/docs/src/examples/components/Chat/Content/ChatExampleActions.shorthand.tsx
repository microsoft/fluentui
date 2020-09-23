import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import * as React from 'react';
import { LikeIcon, MoreIcon } from '@fluentui/react-icons-northstar';

const actionMenu = {
  iconOnly: true,
  items: [
    { key: 'like', icon: <LikeIcon />, title: 'Like' },
    { key: 'more', icon: <MoreIcon />, title: 'More actions' },
  ],
};

const items: ShorthandCollection<ChatItemProps> = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message actionMenu={actionMenu} content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
    ),
    key: 'message-1',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    key: 'message-2',
    message: (
      <Chat.Message
        actionMenu={actionMenu}
        content="I'm back!"
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
      />
    ),
  },
  {
    gutter: <Avatar image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/ade.jpg" />,
    message: <Chat.Message actionMenu={actionMenu} content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
    key: 'message-3',
  },
];

const ChatExample = () => <Chat items={items} />;

export default ChatExample;
