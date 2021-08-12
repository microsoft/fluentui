import * as React from 'react';

import { EditIcon, EmojiIcon, EyeFriendlierIcon, LikeIcon, RedbangIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, Header, Provider, ReactionProps, ShorthandCollection } from '@fluentui/react-northstar';

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
          author: slotLabelStyles('author', { backgroundColor: '#e0ffff', zIndex: 1 }),
          badge: ({ props }) =>
            slotLabelStyles(
              'badge',
              { overflow: 'visible', ...(props.density === 'comfy' && { position: 'absolute' }) },
              { textAlign: 'center', left: '0' },
            ),
          compactBody: slotLabelStyles('body', { backgroundColor: '#778bea' }),
          content: slotLabelStyles('content', { backgroundColor: '#f08080' }),
          reactionGroup: slotLabelStyles('reactions', { backgroundColor: '#e89d4f' }),
          timestamp: slotLabelStyles('timestamp', { backgroundColor: '#bb80f0', opacity: 1 }),
        },
        ChatMessageHeader: {
          root: slotLabelStyles('header', { backgroundColor: '#80d080' }),
        },
        ChatMessageDetails: {
          root: slotLabelStyles('details', { backgroundColor: '#ffffe0' }),
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
    <Header as="h4" design={{ marginBottom: '0.5rem', marginTop: 0 }}>
      Comfy/Default Density
    </Header>
    <Chat
      density="comfy"
      items={[
        {
          gutter: <Avatar image={robinAvatar.image} status={{ color: robinAvatar.status.color }} />,
          message: (
            <Chat.Message
              author="Robin Counts"
              badge={{ icon: <RedbangIcon /> }}
              content="The quick brown fox jumps over the lazy dog. Portez ce vieux whisky au juge blond qui fume. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Nechť již hříšné saxofony ďáblů rozezvučí síň úděsnými tóny waltzu, tanga a quickstepu."
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
    <Header as="h4" design={{ marginBottom: '0.5rem', marginTop: 0 }}>
      Compact Density
    </Header>
    <Chat
      density="compact"
      items={[
        {
          gutter: <Avatar {...robinAvatar} />,
          message: (
            <Chat.Message
              author="Robin Counts"
              badge={{ icon: <RedbangIcon /> }}
              content="The quick brown fox jumps over the lazy dog. Portez ce vieux whisky au juge blond qui fume. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Nechť již hříšné saxofony ďáblů rozezvučí síň úděsnými tóny waltzu, tanga a quickstepu."
              details={<EditIcon outline />}
              header="Message Header (for error messages)"
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
