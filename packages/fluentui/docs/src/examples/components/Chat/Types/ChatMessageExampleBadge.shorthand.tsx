import * as React from 'react';

import { MentionIcon, RedbangIcon, AcceptIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection, Text } from '@fluentui/react-northstar';

const robinAvatar = {
  image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
  status: { color: 'green', icon: <AcceptIcon /> },
};

const items: ShorthandCollection<ChatItemProps> = [
  {
    message: (
      <Chat.Message
        content="Hi, can we talk? It's important!"
        author="Cecil Folk"
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
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content={
          <>
            {'Sure '}
            <Text atMention="me" content="Cecil" />
            {". Let's schedule a meeting."}
          </>
        }
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
        badge={{
          icon: <MentionIcon />,
        }}
        variables={{ hasMention: true }}
      />
    ),
    key: 'message-id-2',
  },
];

const ChatMessageExampleBadge = () => <Chat items={items} />;

export default ChatMessageExampleBadge;
