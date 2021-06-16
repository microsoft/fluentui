import * as React from 'react';

import { Avatar, Chat, ChatItemProps, Flex, Provider, ShorthandCollection } from '@fluentui/react-northstar';

import { robinAvatar, timAvatar } from './compactAvatars';

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...timAvatar} />,
    message: <Chat.Message content="Message with author inline" author="Tim" timestamp="11:21" />,
    key: 'message-id-1',
    attached: 'top',
  },
  {
    gutter: <Avatar {...timAvatar} />,
    message: <Chat.Message content="Attached message" author="Tim" timestamp="11:21" />,
    key: 'message-id-2',
    attached: 'bottom',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: <Chat.Message content="My message with author inline" author="Robin" timestamp="12:22" mine />,
    key: 'message-id-3',
  },
  {
    gutter: <Avatar {...timAvatar} />,
    message: (
      <Chat.Message
        content="Long message wrapping around the author. The quick brown fox jumps over the lazy dog. Portez ce vieux whisky au juge blond qui fume. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Nechť již hříšné saxofony ďáblů rozezvučí síň úděsnými tóny waltzu, tanga a quickstepu."
        author="Tim"
        timestamp="11:21"
      />
    ),
    key: 'message-id-4',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content={
          <>
            <Flex variables={{ messageBox: true }}>Replying to Tim</Flex>
            {'Message with non-text content has box elements on the line below author'}
          </>
        }
        author="Robin"
        timestamp="12:22"
        mine
      />
    ),
    key: 'message-id-5',
  },
];

export const CompactChatWithAuthor = () => (
  <Provider
    theme={{
      componentStyles: {
        Flex: {
          root: ({ variables: v, theme: { siteVariables } }) => ({
            ...(v.messageBox && {
              backgroundColor: siteVariables.colorScheme.default.background1,
              border: `solid 1px ${siteVariables.colorScheme.default.border1}`,
              borderRadius: '4px',
              boxShadow: siteVariables.shadowLevel1,
              clear: 'left',
              padding: '0.3rem',
              width: 'fit-content',
            }),
          }),
        },
      },
    }}
  >
    <Chat compact items={items} />
  </Provider>
);
