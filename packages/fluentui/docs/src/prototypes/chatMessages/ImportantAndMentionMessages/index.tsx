import * as React from 'react';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react';

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' }
};

const items: ShorthandCollection<ChatItemProps> = [
  {
    message: (
      <Chat.Message
        content="This is important message"
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
        badge={{ icon: 'redbang' }}
        variables={{ isImportant: true }}
      />
    ),
    contentPosition: 'end',
    attached: 'top',
    key: 'message-id-1'
  },
  {
    gutter: <Avatar {...janeAvatar} />,
    message: (
      <Chat.Message
        content="This is another important message (see how the borders radius respect the grouped ones)"
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        badge={{ icon: 'redbang' }}
        variables={{ isImportant: true }}
      />
    ),
    attached: 'top',
    key: 'message-id-2'
  },
  {
    gutter: <Avatar {...janeAvatar} />,
    message: (
      <Chat.Message
        content="This is mention message @John"
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        badge={{ icon: 'mention' }}
        variables={{ hasMention: true }}
      />
    ),
    attached: true,
    key: 'message-id-3'
  },
  {
    gutter: <Avatar {...janeAvatar} />,
    message: (
      <Chat.Message
        content="This is another mention message @John with custom color"
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        badge={{ icon: 'mention' }}
        variables={siteVars => ({
          hasMention: true,
          hasMentionColor: siteVars.colors.brand[600]
        })}
      />
    ),
    attached: 'bottom',
    key: 'message-id-4'
  },
  {
    message: (
      <Chat.Message
        content="The color for the important messages can also be changed!"
        author="John Doe"
        timestamp="Yesterday, 10:16 PM"
        mine
        badge={{ icon: 'redbang' }}
        variables={siteVars => ({
          isImportant: true,
          isImportantColor: siteVars.colors.yellow[400]
        })}
      />
    ),
    contentPosition: 'end',
    key: 'message-id-5'
  }
];

const ChatExample = () => <Chat items={items} />;

export default ChatExample;
