import * as React from 'react';

import { EditIcon, TranslationIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, ChatItemProps, ShorthandCollection, Tooltip } from '@fluentui/react-northstar';

import { robinAvatar, timAvatar } from './compactAvatars';

const items: ShorthandCollection<ChatItemProps> = [
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="Edited message"
        author="Robin Counts"
        timestamp="10:20"
        mine
        details={<Tooltip trigger={<EditIcon outline />} content="Edited" />}
      />
    ),
    key: 'message-id-1',
  },
  {
    gutter: <Avatar {...timAvatar} />,
    message: (
      <Chat.Message
        content="Edited and translated message"
        author="Tim Deboer"
        timestamp="10:22"
        details={
          <>
            <Tooltip trigger={<EditIcon outline />} content="Edited" />
            <Tooltip trigger={<TranslationIcon outline design={{ marginLeft: '0.8571rem' }} />} content="Translated" />
          </>
        }
      />
    ),
    key: 'message-id-2',
  },
];

export const CompactChatWithDetails = () => <Chat density="compact" items={items} />;
