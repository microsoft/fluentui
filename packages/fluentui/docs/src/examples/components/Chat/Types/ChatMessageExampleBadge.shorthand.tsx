import * as React from 'react';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import { MentionIcon, RedbangIcon, AcceptIcon } from '@fluentui/react-icons-northstar';

const janeAvatar = {
  image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: <AcceptIcon /> },
};

const items: ShorthandCollection<ChatItemProps> = [
  {
    message: (
      <Chat.Message
        content="Hi, can we talk? It's important!"
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
        badge={{
          icon: <RedbangIcon />,
        }}
        badgePosition="start"
        variables={{ isImportant: true }}
      />
    ),
    contentPosition: 'end',
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...janeAvatar} />,
    message: (
      <Chat.Message
        content="Sure @John. Let's schedule a meeting."
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        badge={{
          icon: <MentionIcon />,
        }}
        variables={{ hasMention: true }}
      />
    ),
    attached: 'top',
    key: 'message-id-2',
  },
];

const ChatExample = () => <Chat items={items} />;

export default ChatExample;
