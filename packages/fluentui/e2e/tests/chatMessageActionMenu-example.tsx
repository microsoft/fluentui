import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import * as React from 'react';
import { LikeIcon, MoreIcon, EmojiIcon } from '@fluentui/react-icons-northstar';

const createActionMenu = (id: string) => ({
  id,
  iconOnly: true,
  inline: false,
  items: [
    { key: 'like', className: 'likeIcon', icon: <LikeIcon />, title: 'Like' },
    { key: 'emoji', className: 'emojiIcon', icon: <EmojiIcon />, title: 'Smile' },
    {
      key: 'more',
      className: 'moreIcon',
      icon: <MoreIcon />,
      title: 'More',
      indicator: null,
      menu: {
        className: 'moreActionMenu',
        items: [
          {
            key: '1',
            content: 'item1',
          },
          {
            key: '2',
            content: 'item2',
          },
          {
            key: '3',
            content: 'item3',
          },
        ],
      },
    },
  ],
});

const items: ShorthandCollection<ChatItemProps> = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        actionMenu={createActionMenu('action-menu0')}
        content="Hello"
        author="Cecil Folk"
        timestamp="Yesterday, 10:15 PM"
        mine
      />
    ),
    key: 'message-0',
  },
  {
    gutter: <Avatar image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg" />,
    message: (
      <Chat.Message
        actionMenu={createActionMenu('action-menu1')}
        content={
          <>
            Hi! check this{' '}
            <a href="#" id="link1">
              link1
            </a>{' '}
            and this{' '}
            <a href="#" id="link2">
              link2
            </a>
          </>
        }
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
      />
    ),
    key: 'message-1',
  },
];

const ChatExample = () => <Chat items={items} />;

export default ChatExample;
