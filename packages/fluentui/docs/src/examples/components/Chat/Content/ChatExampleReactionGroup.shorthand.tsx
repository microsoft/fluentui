import * as React from 'react';

import { useSelectKnob } from '@fluentui/docs-components';
import { Avatar, Chat, ChatItemProps, ReactionProps, ShorthandCollection } from '@fluentui/react-northstar';
import { EmojiIcon, LikeIcon } from '@fluentui/react-icons-northstar';

const reactions: ShorthandCollection<ReactionProps> = [
  { key: 'up', icon: <LikeIcon />, content: 1 },
  { key: 'smile', icon: <EmojiIcon />, content: '5k' },
];

const ChatExampleReactionGroup = () => {
  const [reactionGroupPosition] = useSelectKnob({
    name: 'reactionGroupPosition',
    initialValue: 'start',
    values: ['start', 'end'],
  });

  const items: ShorthandCollection<ChatItemProps> = [
    {
      attached: 'top',
      contentPosition: 'end',
      message: (
        <Chat.Message
          author="Cecil Folk"
          content="Hello"
          mine
          reactionGroup={reactions}
          reactionGroupPosition={reactionGroupPosition}
          timestamp="Yesterday, 10:15 PM"
        />
      ),
      key: 'message-1',
    },
    {
      attached: true,
      contentPosition: 'end',
      key: 'message-2',
      message: (
        <Chat.Message
          author="Cecil Folk"
          content="I'm back!"
          mine
          reactionGroup={[reactions[0]]}
          reactionGroupPosition={reactionGroupPosition}
          timestamp="Yesterday, 10:15 PM"
        />
      ),
    },
    {
      attached: 'bottom',
      contentPosition: 'end',
      key: 'message-3',
      message: (
        <Chat.Message
          author="Cecil Folk"
          content="What's up?"
          details="Edited"
          mine
          reactionGroup={[reactions[0]]}
          reactionGroupPosition={reactionGroupPosition}
          timestamp="Yesterday, 10:16 PM"
        />
      ),
    },
    {
      gutter: <Avatar image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg" />,
      message: (
        <Chat.Message
          author="Robin Counts"
          content="Hi"
          reactionGroup={reactions}
          reactionGroupPosition={reactionGroupPosition}
          timestamp="Yesterday, 10:15 PM"
        />
      ),
      key: 'message-4',
    },
  ];

  return <Chat items={items} />;
};

export default ChatExampleReactionGroup;
