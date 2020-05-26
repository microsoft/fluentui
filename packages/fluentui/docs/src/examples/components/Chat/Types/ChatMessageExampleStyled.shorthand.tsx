import * as React from 'react';
import { Avatar, AvatarProps, Chat, Provider, ReactionProps, ShorthandCollection } from '@fluentui/react-northstar';
import { EmojiIcon, LikeIcon, AcceptIcon, MentionIcon, ExclamationCircleIcon } from '@fluentui/react-icons-northstar';

const reactions: ShorthandCollection<ReactionProps> = [
  { key: 'up', icon: <LikeIcon />, content: '1K' },
  { key: 'smile', icon: <EmojiIcon />, content: 5 },
];

const janeAvatar: AvatarProps = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: <AcceptIcon /> },
};

const content = (
  <div>
    Sure! Try one of these places:
    <br />
    <a href="#">www.goodFood1.com</a>,<br />
    <a href="#">www.goodFood2.com</a> or
    <br />
    <a href="#">www.goodFood3.com</a>
  </div>
);

const slotLabelStyles: any = (label, beforeStyles?, slotStyles?) => ({
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
    ...beforeStyles,
  },
});

const ChatMessageExampleStyled = () => (
  <Provider
    theme={{
      componentStyles: {
        ChatItem: {
          root: { ...slotLabelStyles('chat-item-root'), backgroundColor: 'transparent' },
          gutter: {
            ...slotLabelStyles('gutter', { bottom: '-11px' }),
            backgroundColor: '#FF00FF',
            padding: 0,
            position: 'absolute',
          },
        },
        ChatMessage: {
          root: { ...slotLabelStyles('chat-message-root'), backgroundColor: '#87CEFA' },
          author: ({ props: { mine } }) => ({
            ...(!mine && {
              ...slotLabelStyles('author', {}, { display: 'inline-block' }),
              backgroundColor: '#E0FFFF',
            }),
          }),
          content: { ...slotLabelStyles('content'), backgroundColor: '#F08080' },
          timestamp: {
            ...slotLabelStyles('timestamp', {}, { display: 'inline-block' }),
            backgroundColor: '#FFFFE0',
          },
          badge: {
            ...slotLabelStyles(
              'badge',
              { textAlign: 'center', left: '0px' },
              { position: 'absolute', overflow: 'visible' },
            ),
            backgroundColor: '#FFFF00',
          },
          reactionGroup: {
            ...slotLabelStyles('reactions', {}, { padding: '8px' }),
            backgroundColor: '#FFFFE0',
          },
        },
      },
      componentVariables: {
        ChatMessage: siteVars => ({
          content: {
            focusOutlineColor: siteVars.colors.red[400],
          },
        }),
      },
    }}
  >
    <Chat
      items={[
        {
          message: {
            content: (
              <Chat.Message
                content="Hey, do you know any restaurants with good food?"
                author="John Doe"
                timestamp="Yesterday, 10:15 PM"
                mine
                badge={{ icon: <MentionIcon /> }}
                badgePosition="start"
                reactionGroup={reactions}
              />
            ),
          },
          contentPosition: 'end',
          key: 'message-id-1',
        },
        {
          key: 'message-id-2',
          gutter: <Avatar {...janeAvatar} />,
          message: (
            <Chat.Message
              content={{ content }}
              author="Jane Doe"
              timestamp="Yesterday, 10:15 PM"
              badge={{ icon: <ExclamationCircleIcon /> }}
              reactionGroup={reactions}
            />
          ),
        },
      ]}
    />
  </Provider>
);

export default ChatMessageExampleStyled;
