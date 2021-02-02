import * as React from 'react';
import { Chat, ChatItemProps, ShorthandCollection, Avatar, Divider, Provider } from '@fluentui/react-northstar';
import GroupControlMessages from './GroupControlMessages';
import ControlMessage from './ControlMessage';
import { groupControlMessageItems, mainControlMessage } from './mockData';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const robinAvatar = {
  image: 'public/images/avatar/RobinCounts.jpg',
  status: {
    color: 'green',
    icon: <AcceptIcon />,
  },
};

const ChatExampleWithControlMessages = () => {
  const items: ShorthandCollection<ChatItemProps> = [
    {
      message: (
        // Adding control message
        <ControlMessage
          icon={true}
          message={{
            content: (
              <div>
                <a href="/">Cecil Folk</a> joined the team
              </div>
            ),
          }}
        />
      ),
      className: 'ui-chat__item_control',
      key: 'message-id-6',
    },
    {
      // Adding Grouped control messages
      message: <GroupControlMessages items={groupControlMessageItems} mainMessage={mainControlMessage} />,
      className: 'ui-chat__item_control_group',
      key: 'message-id-7',
    },
    {
      gutter: <Avatar {...robinAvatar} />,
      message: <Chat.Message content="Sure! Let's try it." author="Robin Counts" timestamp="Yesterday, 10:15 PM" />,
      key: 'message-id-8',
    },
    {
      children: <Divider content="Today" color="brand" important />,
      key: 'message-id-9',
    },
    {
      message: <Chat.Message content="Ok, let's go." author="Cecil Folk" timestamp="Today, 11:15 PM" mine />,
      contentPosition: 'end',
      key: 'message-id-10',
    },
  ];
  return (
    <Provider
      theme={{
        componentStyles: {
          ChatItem: {
            root: {
              '&.ui-chat__item_control_group .ui-chat__item__message': {
                marginLeft: 0,
              },
              '&.ui-chat__item_control .ui-chat__item__message': {
                marginLeft: '16px',
              },
            },
          },
          ChatMessage: {
            root: ({ props: p, theme: { siteVariables } }) => ({
              '&.ui-chat__message_control': {
                padding: 0,
                marginLeft: '10px',
                backgroundColor: siteVariables.colors.grey[100],
                fontSize: '14px',
              },
            }),
          },
          ListItem: {
            root: {
              padding: 0,
              display: 'block',
              minHeight: '25px',
            },
          },
        },
      }}
    >
      <Chat items={items} />
    </Provider>
  );
};

export default ChatExampleWithControlMessages;
