import { hacker, name } from 'faker';
import * as React from 'react';

import { useBooleanKnob, useSelectKnob, useStringKnob } from '@fluentui/docs-components';
import {
  EmojiIcon,
  EyeFriendlierIcon,
  LikeIcon,
  MentionIcon,
  MoreIcon,
  PersonIcon,
  PresenceAvailableIcon,
  RedbangIcon,
} from '@fluentui/react-icons-northstar';
import {
  Avatar,
  Chat,
  ChatItem,
  ChatItemProps,
  ChatMessageProps,
  MenuProps,
  ReactionProps,
  ShorthandCollection,
  ShorthandValue,
} from '@fluentui/react-northstar';

const attachedMap: Record<'top' | 'bottom' | 'true' | 'false', ChatItemProps['attached']> = {
  top: 'top',
  bottom: 'bottom',
  true: true,
  false: false,
};

const actionMenu: ShorthandValue<MenuProps> = {
  iconOnly: true,
  items: [
    { key: 'like', icon: <LikeIcon />, title: 'Like' },
    { key: 'more', icon: <MoreIcon />, title: 'More' },
  ],
};

const reactionGroup: ShorthandCollection<ReactionProps> = [
  { key: 'up', icon: <LikeIcon />, content: 1 },
  { key: 'smile', icon: <EmojiIcon />, content: 3 },
];

const ChatPlayground: React.FunctionComponent = () => {
  // ChatProps
  const [density] = useSelectKnob({ name: 'density', initialValue: 'comfy', values: ['compact', 'comfy'] });

  // ChatItemProps
  const [attachedValue] = useSelectKnob({
    name: 'attached',
    initialValue: 'false',
    values: ['top', 'bottom', 'true', 'false'],
  });
  const [contentPosition] = useSelectKnob({ name: 'contentPosition', initialValue: 'start', values: ['start', 'end'] });

  // ChatMessageProps
  const [actions] = useBooleanKnob({ name: 'actionMenu', content: 'show actions' });
  const [author] = useStringKnob({ name: 'author', initialValue: `${name.firstName()} ${name.lastName()}` });
  const [badge] = useSelectKnob({
    name: 'badge',
    content: 'badge type',
    allowsNone: true,
    values: ['important', 'mention'],
  });
  const [content] = useStringKnob({ name: 'content', initialValue: hacker.phrase() });
  const [details] = useStringKnob({ name: 'details' });
  const [header] = useStringKnob({ name: 'header' });
  const [mine] = useBooleanKnob({ name: 'mine' });
  const [reactions] = useBooleanKnob({ name: 'reactionGroup', content: 'show reactions' });
  const [reactionGroupPosition] = useSelectKnob({
    name: 'reactionGroupPosition',
    initialValue: 'start',
    values: ['start', 'end'],
  });
  const [readStatus] = useSelectKnob({
    name: 'readStatus',
    content: 'read status',
    allowsNone: true,
    values: ['sent', 'read'],
  });
  const [timestamp] = useStringKnob({ name: 'timestamp', initialValue: 'Yesterday, 10:15' });

  const attached = attachedMap[attachedValue];
  const size = density === 'compact' ? 'smallest' : undefined;

  const chatItemProps: ChatItemProps = {
    ...(attached && { attached }),
    ...(contentPosition === 'end' && { contentPosition }),
  };

  // Create prop object with default props only to minimize displayed example code
  const chatMessageProps: ChatMessageProps = {
    ...(actions && { actionMenu }),
    ...(author && { author }),
    ...(badge === 'important' && {
      badge: {
        icon: <RedbangIcon />,
      },
      variables: { isImportant: true },
    }),
    ...(badge === 'mention' && {
      badge: {
        icon: <MentionIcon />,
      },
      variables: { hasMention: true },
    }),
    ...(content && { content }),
    ...(details && { details }),
    ...(header && { header }),
    ...(reactions && { reactionGroup }),
    ...(readStatus === 'sent' && {
      readStatus: {
        title: 'Sent',
        content: <PresenceAvailableIcon size="small" />,
      },
    }),
    ...(readStatus === 'read' && {
      readStatus: {
        title: 'Read by All',
        content: <EyeFriendlierIcon size="small" />,
      },
    }),
    ...(timestamp && { timestamp }),
  };

  return (
    <Chat density={density}>
      <ChatItem
        gutter={<Avatar icon={<PersonIcon />} size={size} />}
        message={<Chat.Message mine={mine} reactionGroupPosition={reactionGroupPosition} {...chatMessageProps} />}
        {...chatItemProps}
      />
    </Chat>
  );
};

export default ChatPlayground;
