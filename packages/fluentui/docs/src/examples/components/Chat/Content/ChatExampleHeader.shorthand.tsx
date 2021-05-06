import { Avatar, Chat, Text, ReactionGroup, ReactionGroupProps, ChatProps, Flex } from '@fluentui/react-northstar';
import * as React from 'react';
import { EmojiIcon, LikeIcon } from '@fluentui/react-icons-northstar';

const reactions: ReactionGroupProps['items'] = [
  { key: 'up', icon: <LikeIcon />, content: '1K' },
  { key: 'smile', icon: <EmojiIcon />, content: 5 },
];

const items: ChatProps['items'] = [
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
      <Chat.Message
        reactionGroup={reactions}
        header={
          <Flex
            gap="gap.small"
            styles={{
              whiteSpace: 'nowrap',
            }}
          >
            <Text
              styles={{
                marginLeft: '5px',
              }}
            >
              Robin Counts
            </Text>
            <Text
              styles={{
                marginLeft: '5px',
              }}
            >
              Yesterday, 10:15 PM
            </Text>
            <ReactionGroup items={reactions} />
          </Flex>
        }
        content="Hi"
      />
    ),
    key: 'message-3',
  },
];

const ChatExampleHeader = () => <Chat items={items} />;

export default ChatExampleHeader;
