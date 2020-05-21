import {
  Avatar,
  Chat,
  ChatItemProps,
  ReactionProps,
  ShorthandCollection,
  Text,
  ReactionGroup,
  Reaction,
} from '@fluentui/react-northstar';
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
        header={
          <>
            <ReactionGroup>
              <Reaction icon={<LikeIcon />} content="1K" />
            </ReactionGroup>
            <Text
              styles={{
                marginLeft: '5px',
              }}
            >
              John Doe
            </Text>
            <Text
              styles={{
                marginLeft: '5px',
              }}
            >
              Yesterday, 10:15 PM
            </Text>
          </>
        }
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
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
      />
    ),
  },
  {
    gutter: <Avatar image="public/images/avatar/small/ade.jpg" />,
    message: <Chat.Message reactionGroup={reactions} content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
    key: 'message-3',
  },
];

const ChatExampleCustomHeader = () => <Chat items={items} />;

export default ChatExampleCustomHeader;
