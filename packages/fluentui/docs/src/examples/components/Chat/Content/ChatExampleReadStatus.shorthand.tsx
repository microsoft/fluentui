import * as React from 'react';
import { Chat, ReactionGroupProps, ChatProps } from '@fluentui/react-northstar';
import { EmojiIcon, LikeIcon, EyeFriendlierIcon } from '@fluentui/react-icons-northstar';

const reactions: ReactionGroupProps['items'] = [
  { key: 'up', icon: <LikeIcon />, content: '1K' },
  { key: 'smile', icon: <EmojiIcon />, content: 5 },
];

const items: ChatProps['items'] = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message reactionGroup={reactions} content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
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
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        readStatus="Read by All"
        readStatusIndicator={<EyeFriendlierIcon size="small" />}
        mine
      />
    ),
  },
];

const ChatExampleReadStatus = () => <Chat items={items} />;

export default ChatExampleReadStatus;
