import * as React from 'react';
import descriptionMd from './Description.md';
import { Avatar } from '@fluentui/react-components';
import { ChatLegacy, ChatMessageLegacy, ChatMyMessageLegacy } from '@fluentui/react-migration-v0-v9';

export const Chat = () => {
  return (
    <ChatLegacy>
      <ChatMessageLegacy avatar={<Avatar name="Ashley McCarthy" badge={{ status: 'available' }} />}>
        Hello I am Ashley
      </ChatMessageLegacy>
      <ChatMyMessageLegacy>Nice to meet you!</ChatMyMessageLegacy>
    </ChatLegacy>
  );
};

export default {
  title: 'Preview Components/Legacy Chat/ChatLegacy',
  component: ChatLegacy,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
