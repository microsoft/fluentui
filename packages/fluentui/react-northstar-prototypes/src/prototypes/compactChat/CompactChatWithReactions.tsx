import * as React from 'react';
import { startCase } from 'lodash';

import { EmojiIcon, EmojiSadIcon, LikeIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, MenuProps, ReactionProps, ShorthandCollection } from '@fluentui/react-northstar';

import { timAvatar } from './compactAvatars';

const reactions = [
  {
    key: 'up',
    icon: <LikeIcon />,
  },
  {
    key: 'smile',
    icon: <EmojiIcon />,
  },
  {
    key: 'sad',
    icon: <EmojiSadIcon />,
  },
];

const ChatMessage = ({
  reactionCounts,
  content,
  hideActionMenu,
}: {
  reactionCounts: number[];
  content: string;
  hideActionMenu?: boolean;
}) => {
  const [myReaction, setMyReaction] = React.useState<string>();

  const reactionGroup: ShorthandCollection<ReactionProps> = reactions
    .map((reaction, i) => ({
      ...reaction,
      as: 'button',
      content: (reactionCounts[i] ?? 0) + (myReaction === reaction.key ? 1 : 0),
      onClick: () => setMyReaction(reaction.key === myReaction ? undefined : reaction.key),
      variables: { meReacting: reaction.key === myReaction },
    }))
    .filter(r => r.content);

  const actionMenu: MenuProps = {
    iconOnly: true,
    items: reactions.map(reaction => ({
      ...reaction,
      onClick: () => setMyReaction(reaction.key === myReaction ? undefined : reaction.key),
      title: startCase(reaction.key),
    })),
  };

  return (
    <Chat.Message
      content={content}
      author="Tim Deboer"
      timestamp="11:21"
      reactionGroup={reactionGroup}
      actionMenu={!hideActionMenu && actionMenu}
    />
  );
};

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...timAvatar} />,
    message: <ChatMessage content="Message with actions" reactionCounts={[]} hideActionMenu={true} />,
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...timAvatar} />,
    message: <ChatMessage content="Message with reactions" reactionCounts={[1, 2]} />,
    key: 'message-id-2',
  },
  {
    gutter: <Avatar {...timAvatar} />,
    message: <ChatMessage content="Message with reactions and action menu" reactionCounts={[3, 1, 1]} />,
    key: 'message-id-3',
  },
];

export const CompactChatWithReactions = () => <Chat density="compact" items={items} />;
