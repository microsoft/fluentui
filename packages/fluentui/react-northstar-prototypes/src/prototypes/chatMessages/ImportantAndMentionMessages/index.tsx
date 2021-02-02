import * as React from 'react';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import { AcceptIcon, MentionIcon, RedbangIcon } from '@fluentui/react-icons-northstar';

const robinAvatar = {
  image: 'public/images/avatar/RobinCounts.jpg',
  status: { color: 'green', icon: <AcceptIcon /> },
};

const items: ShorthandCollection<ChatItemProps> = [
  {
    message: (
      <Chat.Message
        content="This is important message"
        author="Cecil Folk"
        timestamp="Yesterday, 10:15 PM"
        mine
        badge={{ icon: <RedbangIcon /> }}
        variables={{ isImportant: true }}
      />
    ),
    contentPosition: 'end',
    attached: 'top',
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="This is another important message (see how the borders radius respect the grouped ones)"
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
        badge={{ icon: <RedbangIcon /> }}
        variables={{ isImportant: true }}
      />
    ),
    attached: 'top',
    key: 'message-id-2',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="This is mention message @John"
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
        badge={{ icon: <MentionIcon /> }}
        variables={{ hasMention: true }}
      />
    ),
    attached: true,
    key: 'message-id-3',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="This is another mention message @John with custom color"
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
        badge={{ icon: <MentionIcon /> }}
        variables={siteVars => ({
          hasMention: true,
          hasMentionColor: siteVars.colors.brand[600],
        })}
      />
    ),
    attached: 'bottom',
    key: 'message-id-4',
  },
  {
    message: (
      <Chat.Message
        content="The color for the important messages can also be changed!"
        author="Cecil Folk"
        timestamp="Yesterday, 10:16 PM"
        mine
        badge={{ icon: <RedbangIcon /> }}
        variables={siteVars => ({
          isImportant: true,
          isImportantColor: siteVars.colors.yellow[400],
        })}
      />
    ),
    contentPosition: 'end',
    key: 'message-id-5',
  },
];

const ChatExample = () => <Chat items={items} />;

export default ChatExample;
