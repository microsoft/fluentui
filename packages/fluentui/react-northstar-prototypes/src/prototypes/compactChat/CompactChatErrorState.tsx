import * as React from 'react';

import { ExclamationTriangleIcon, RetryIcon } from '@fluentui/react-icons-northstar';
import {
  Avatar,
  Button,
  Chat,
  ChatItemProps,
  Flex,
  ShorthandCollection,
  Text,
  Provider,
} from '@fluentui/react-northstar';

import { robinAvatar } from './compactAvatars';

const error = (
  <Flex space="between" vAlign="center">
    <Flex gap="gap.small" vAlign="center">
      <ExclamationTriangleIcon outline size="small" />
      <Text content="Failed to Send" error size="small" />
    </Flex>
    <Button iconOnly text size="small" title="Retry" content={<RetryIcon />} />
  </Flex>
);

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="Failed Message"
        author="Robin Counts"
        mine
        timestamp="11:21"
        header={error}
        variables={{ hasError: true }}
      />
    ),
    key: 'message-id-1',
  },
];

export const CompactChatErrorState = () => (
  <Provider
    theme={{
      componentStyles: {
        ChatMessage: {
          root: ({ variables: v, theme: { siteVariables } }) => ({
            ...(v.hasError && {
              backgroundColor: siteVariables.colorScheme.red.background1,
              borderColor: siteVariables.colorScheme.red.border,
              '&:hover': {
                backgroundColor: siteVariables.colorScheme.red.background1,
                borderColor: siteVariables.colorScheme.red.border,
              },
            }),
          }),
        },
      },
    }}
  >
    <Chat density="compact" items={items} />
  </Provider>
);
