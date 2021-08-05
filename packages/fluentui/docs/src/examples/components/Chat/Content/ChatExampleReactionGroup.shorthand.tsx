import { Avatar, Chat, ChatItemProps, ReactionProps, ShorthandCollection } from '@fluentui/react-northstar';
import * as React from 'react';
import { EmojiIcon, LikeIcon } from '@fluentui/react-icons-northstar';

const reactions: ShorthandCollection<ReactionProps> = [
  { key: 'up', icon: <LikeIcon />, content: '1K' },
  { key: 'smile', icon: <EmojiIcon />, content: 5 },
];

const items: ShorthandCollection<ChatItemProps> = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        reactionGroup={reactions}
        content="Hello"
        author="Cecil Folk"
        timestamp="Yesterday, 10:15 PM"
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
        reactionGroup={[{ key: 'up', icon: <LikeIcon />, content: '8' }]}
        content="I'm back!"
        author="Cecil Folk"
        timestamp="Yesterday, 10:15 PM"
        mine
      />
    ),
  },
  {
    gutter: <Avatar image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg" />,
    message: (
      <Chat.Message reactionGroup={reactions} content="Hi" author="Robin Counts" timestamp="Yesterday, 10:15 PM" />
    ),
    key: 'message-3',
  },
];

const ChatExampleReactionGroup = () => <Chat items={items} />;

export default ChatExampleReactionGroup;
