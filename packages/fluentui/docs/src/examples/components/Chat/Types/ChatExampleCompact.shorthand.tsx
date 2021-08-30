import * as React from 'react';

import { AcceptIcon, EditIcon, EyeFriendlierIcon, MentionIcon } from '@fluentui/react-icons-northstar';
import {
  Avatar,
  AvatarProps,
  Chat,
  ChatItemProps,
  Divider,
  ShorthandCollection,
  Text,
} from '@fluentui/react-northstar';

const [robinAvatar, robertAvatar] = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
].map<AvatarProps>(src => ({
  image: src,
  size: 'smallest',
  status: { color: '#6bb700', icon: <AcceptIcon />, size: 'smallest' },
}));

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...robertAvatar} />,
    message: <Chat.Message content="Hello" author="Robert Tolbert" timestamp="10:15 PM" mine />,
    attached: 'top',
    key: 'message-id-1',
  },
  {
    message: <Chat.Message content="I'm back!" author="Robert Tolbert" timestamp="10:15 PM" mine />,
    attached: true,
    key: 'message-id-2',
  },
  {
    message: (
      <Chat.Message
        content="What do you think about goodFood.com?"
        author="Robert Tolbert"
        details={<EditIcon outline />}
        timestamp="10:16 PM"
        mine
      />
    ),
    attached: 'bottom',
    key: 'message-id-3',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content={
          <>
            {'Hi '}
            <Text atMention="me" content="Robert" />
            {'!'}
          </>
        }
        author="Robin Counts"
        timestamp="10:20 PM"
        badge={{
          icon: <MentionIcon />,
        }}
        variables={{
          hasMention: true,
        }}
      />
    ),
    attached: 'top',
    key: 'message-id-4',
  },
  {
    message: <Chat.Message content="Looks good!" author="Robin Counts" timestamp="10:21 PM" />,
    attached: true,
    key: 'message-id-5',
  },
  {
    message: <Chat.Message content="I also like great-food.com." author="Robin Counts" timestamp="10:25 PM" />,
    attached: 'bottom',
    key: 'message-id-6',
  },
  {
    gutter: <Avatar {...robertAvatar} />,
    message: (
      <Chat.Message content="Would you like to grab lunch there?" author="Robert Tolbert" timestamp="10:30 PM" mine />
    ),
    key: 'message-id-7',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: <Chat.Message content="Sure! Let's try it." author="Robin Counts" timestamp="10:32 PM" />,
    key: 'message-id-8',
  },
  {
    children: <Divider content="Today" />,
    key: 'message-id-9',
  },
  {
    gutter: <Avatar {...robertAvatar} />,
    message: (
      <Chat.Message
        content="Ok, let's go."
        author="Robert Tolbert"
        timestamp="11:15 PM"
        mine
        readStatus={{
          title: 'Read',
          content: <EyeFriendlierIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-10',
  },
];

const ChatExampleCompact = () => <Chat items={items} density="compact" />;

export default ChatExampleCompact;
