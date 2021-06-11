import * as React from 'react';

import {
  Avatar,
  Chat,
  EditIcon,
  EmojiIcon,
  EyeFriendlierIcon,
  LikeIcon,
  Provider,
  ReactionProps,
  RedbangIcon,
  ShorthandCollection,
} from '@fluentui/react-northstar';

import { robinAvatar } from './compactAvatars';

const reactions: ShorthandCollection<ReactionProps> = [
  {
    key: 'up',
    icon: <LikeIcon />,
    content: '1',
  },
  {
    key: 'smile',
    icon: <EmojiIcon />,
    content: '5',
  },
];

const slotLabelStyles = (label: string, slotStyles?, beforeStyles?) => ({
  border: '1px solid #000000',
  padding: '12px',
  position: 'relative',
  ...slotStyles,
  ':before': {
    background: '#000000',
    bottom: '-1px',
    color: '#ffffff',
    content: `'${label}'`,
    fontSize: '11px',
    letterSpacing: '0.1px',
    lineHeight: '9px',
    opacity: 0.75,
    paddingBottom: '2px',
    position: 'absolute',
    right: '-1px',
    ...beforeStyles,
  },
});

export const CompactChatSlots = () => (
  <Provider
    theme={{
      componentStyles: {
        ChatItem: {
          gutter: slotLabelStyles(
            'gutter',
            { backgroundColor: '#ff00ff', padding: 0, position: 'absolute' },
            { bottom: '-11px' },
          ),
        },
        ChatMessage: {
          root: slotLabelStyles('chat-message-root', { backgroundColor: '#87cefa' }),
          author: slotLabelStyles('author', { backgroundColor: '#e0ffff' }),
          content: ({ props: { compact } }) => slotLabelStyles('content', !compact && { backgroundColor: '#f08080' }),
          timestamp: ({ props: { compact } }) =>
            slotLabelStyles('timestamp', { backgroundColor: '#ffffe0', ...(compact && { opacity: 1 }) }),
          badge: ({ props: { compact } }) =>
            slotLabelStyles(
              'badge',
              { overflow: 'visible', ...(!compact && { position: 'absolute' }) },
              { textAlign: 'center', left: '0' },
            ),
          reactionGroup: slotLabelStyles('reactions', { backgroundColor: '#e89d4f' }),
        },
        ChatMessageHeader: {
          root: slotLabelStyles('header', { backgroundColor: '#80d080' }),
        },
        ChatMessageCompactBody: {
          root: slotLabelStyles('body', { backgroundColor: '#778bea' }),
        },
        ChatMessageDetails: {
          root: slotLabelStyles('details', { backgroundColor: '#bb80f0' }),
        },
        ChatMessageReadStatus: {
          root: slotLabelStyles(
            'read',
            { position: 'absolute', padding: undefined },
            { bottom: undefined, top: '-11px', width: '22px' },
          ),
        },
      },
    }}
  >
    <Chat
      items={[
        {
          gutter: <Avatar image={robinAvatar.image} status={{ color: '#6bb700' }} />,
          message: (
            <Chat.Message
              author="Robin"
              badge={{ icon: <RedbangIcon /> }}
              content="Message Text"
              details="Edited"
              reactionGroup={reactions}
              readStatus={<EyeFriendlierIcon size="small" />}
              timestamp="11:21"
              variables={{ isImportant: true }}
            />
          ),
          key: 'message-id-1',
        },
      ]}
      design={{ marginBottom: '1rem' }}
    />
    <Chat
      compact
      items={[
        {
          gutter: <Avatar {...robinAvatar} />,
          message: (
            <Chat.Message
              author="Robin"
              badge={{ icon: <RedbangIcon /> }}
              content="Message Text"
              details={<EditIcon outline />}
              header="Message Header"
              reactionGroup={reactions}
              readStatus={<EyeFriendlierIcon size="small" />}
              timestamp="11:21"
              variables={{ isImportant: true }}
            />
          ),
          key: 'message-id-1',
        },
      ]}
    />
  </Provider>
);
