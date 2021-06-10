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
    content: '1K',
  },
  {
    key: 'smile',
    icon: <EmojiIcon />,
    content: 5,
  },
];

const slotLabelStyles = (label: string, beforeStyles?, slotStyles?) => ({
  position: 'relative',
  border: '1px solid #000',
  padding: '12px',
  ...slotStyles,
  ':before': {
    content: `'${label}'`,
    position: 'absolute',
    background: '#000',
    paddingBottom: '2px',
    bottom: '-1px',
    right: '-1px',
    color: 'white',
    fontSize: '11px',
    letterSpacing: '0.1px',
    lineHeight: '9px',
    opacity: 0.75,
    ...beforeStyles,
  },
});

export const CompactChatSlots = () => (
  <Provider
    theme={{
      componentStyles: {
        ChatItem: {
          gutter: {
            ...slotLabelStyles('gutter', { bottom: '-11px' }),
            backgroundColor: '#FF00FF',
            padding: 0,
            position: 'absolute',
          },
        },
        ChatMessage: {
          root: {
            ...slotLabelStyles('chat-message-root'),
            backgroundColor: '#87CEFA',
            '> .ui-chat__message__body': {
              ...slotLabelStyles('body'),
              backgroundColor: '#778bea',
              '> .ui-chat__message__main': { ...slotLabelStyles('main'), backgroundColor: '#F08080' },
            },
          },
          author: () => ({
            ...slotLabelStyles('author'),
            backgroundColor: '#E0FFFF',
          }),
          content: ({ props: { compact } }) => ({
            ...slotLabelStyles('content'),
            ...(!compact && { backgroundColor: '#F08080' }),
          }),
          timestamp: ({ props: { compact } }) => ({
            ...slotLabelStyles('timestamp'),
            backgroundColor: '#FFFFE0',
            ...(compact && { opacity: 1 }),
          }),
          badge: ({ props: { compact } }) => ({
            ...slotLabelStyles(
              'badge',
              { textAlign: 'center', left: '0px' },
              { ...(!compact && { position: 'absolute' }), overflow: 'visible' },
            ),
            backgroundColor: '#FFFF00',
          }),
          reactionGroup: {
            ...slotLabelStyles('reactions'),
            backgroundColor: '#e89d4f',
          },
        },
        ChatMessageHeader: {
          root: { ...slotLabelStyles('header'), backgroundColor: '#80D080' },
        },
        ChatMessageDetails: {
          root: { ...slotLabelStyles('details'), backgroundColor: '#bb80f0' },
        },
        ChatMessageReadStatus: {
          root: {
            ...slotLabelStyles(
              'read',
              { top: '-11px', bottom: undefined, width: '22px' },
              { position: 'absolute', padding: undefined },
            ),
          },
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
    />
    <br />
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
