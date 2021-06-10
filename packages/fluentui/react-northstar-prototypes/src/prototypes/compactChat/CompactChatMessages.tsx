import * as React from 'react';
import {
  Avatar,
  Button,
  Chat,
  ChatItemProps,
  Divider,
  EditIcon,
  EmojiIcon,
  ExclamationTriangleIcon,
  EyeFriendlierIcon,
  Flex,
  LikeIcon,
  MentionIcon,
  MoreIcon,
  RedbangIcon,
  RetryIcon,
  ShorthandCollection,
  SizeValue,
  Text,
} from '@fluentui/react-northstar';

const [robinAvatar, timAvatar] = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
].map(src => ({
  image: src,
  status: { color: '#6bb700', size: 'smallest' as SizeValue },
}));

const reactions = [
  {
    key: 'up',
    icon: <LikeIcon />,
    content: '1K',
  },
  {
    key: 'smile',
    icon: <EmojiIcon />,
    content: 5,
  },
];

const actionMenu = {
  iconOnly: true,
  items: [
    {
      key: 'like',
      icon: <LikeIcon />,
      title: 'Like',
    },
    {
      key: 'more',
      icon: <MoreIcon />,
      title: 'More actions',
    },
  ],
};

const error = (
  <Flex space="between">
    <Flex gap="gap.small" vAlign="center">
      <ExclamationTriangleIcon outline />
      <Text content="Failed to Send" error />
    </Flex>
    <Button iconOnly text size="small" content={<RetryIcon />} />
  </Flex>
);

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: <Chat.Message content="Regular Message" author="Tim" timestamp="11:21 AM" />,
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: <Chat.Message content="Attached Message" author="Tim" timestamp="11:21 AM" />,
    key: 'message-id-1-5',
    attached: true,
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: <Chat.Message content="Edited Message" author="Tim" timestamp="10:15 PM" details={<EditIcon outline />} />,
    key: 'message-id-2',
  },
  {
    gutter: <Avatar {...robinAvatar} size="smallest" />,
    message: (
      <Chat.Message
        content="Read Message"
        author="Robin"
        timestamp="10:15 PM"
        mine
        readStatus={{
          title: 'Read by All',
          content: <EyeFriendlierIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-3',
  },
  {
    gutter: <Avatar {...robinAvatar} size="smallest" />,
    message: (
      <Chat.Message
        content="Multiline Read Message. I can help you with the rollout plan for EMEA. I have been working closely this week with the local team to get the timings from the external AD agency and media buying team. I can help you with the rollout plan for EMEA as I've been working closely this week with the local marketing team to the get the timings from the external AD agency and media buying team."
        author="Robin"
        timestamp="10:15 PM"
        mine
        readStatus={{
          title: 'Read by All',
          content: <EyeFriendlierIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-4',
  },
  {
    gutter: <Avatar {...robinAvatar} size="smallest" />,
    message: (
      <Chat.Message
        content="Read and Edited Message"
        author="Robin"
        timestamp="10:15 PM"
        mine
        details={<EditIcon outline />}
        readStatus={{
          title: 'Read by All',
          content: <EyeFriendlierIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-5',
  },
  {
    gutter: <Avatar {...robinAvatar} size="smallest" />,
    message: (
      <Chat.Message
        content="Multiline Read and Edited Message. I can help you with the rollout plan for EMEA. I have been working closely this week with the local team to get the timings from the external AD agency and media buying team. I can help you with the rollout plan for EMEA as I've been working closely this week with the local marketing team to the get the timings from the external AD agency and media buying team."
        author="Robin"
        timestamp="10:15 PM"
        mine
        details={<EditIcon outline />}
        readStatus={{
          title: 'Read by All',
          content: <EyeFriendlierIcon size="small" />,
        }}
      />
    ),
    key: 'message-id-6',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: (
      <Chat.Message
        content="Important Message"
        author="Tim"
        timestamp="11:21 AM"
        badge={{
          icon: <RedbangIcon />,
        }}
        variables={{
          isImportant: true,
        }}
      />
    ),
    key: 'message-id-7',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: (
      <Chat.Message
        content="Mentioned Message"
        author="Tim"
        timestamp="11:21 AM"
        badge={{
          icon: <MentionIcon />,
        }}
        variables={{
          hasMention: true,
        }}
      />
    ),
    key: 'message-id-8',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: (
      <Chat.Message
        content="Important and Mentioned Message"
        author="Tim"
        timestamp="11:21 AM"
        badge={{
          icon: <MentionIcon />,
        }}
        variables={{
          hasMention: true,
          isImportant: true,
        }}
      />
    ),
    key: 'message-id-9',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: (
      <Chat.Message content="Message with reactions" author="Tim" timestamp="11:21 AM" reactionGroup={reactions} />
    ),
    key: 'message-id-10',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: <Chat.Message content="Message with actions" author="Tim" timestamp="11:21 AM" actionMenu={actionMenu} />,
    key: 'message-id-11',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: <Chat.Message content="Regular Message" author="Tim" timestamp="11:21 AM" />,
    key: 'message-id-12',
  },

  {
    children: <Divider content="Today" />,
    key: 'message-id-12-5',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: <Chat.Message content="Regular Message" author="Tim" timestamp="11:21 AM" />,
    key: 'message-id-13',
  },
  {
    gutter: <Avatar {...timAvatar} size="smallest" />,
    message: <Chat.Message content="Failed Message" author="Tim" timestamp="11:21 AM" header={error} />,
    key: 'message-id-14',
  },
];

export const CompactChatMessages = () => <Chat compact items={items} />;
