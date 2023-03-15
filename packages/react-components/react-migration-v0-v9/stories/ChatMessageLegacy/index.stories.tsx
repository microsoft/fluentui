import * as React from 'react';
import descriptionMd from './Description.md';
import { Avatar } from '@fluentui/react-components';
import { ChatLegacy, ChatMessageLegacy } from '@fluentui/react-migration-v0-v9';

export const ChatMessage = () => {
  return (
    <ChatLegacy>
      <ChatMessageLegacy avatar={<Avatar name="Ashley McCarthy" badge={{ status: 'available' }} />}>
        Hello I am Ashley
      </ChatMessageLegacy>
    </ChatLegacy>
  );
};

export const ChatMessageDecoration = () => {
  return (
    <ChatLegacy>
      <ChatMessageLegacy decoration="important">Important message</ChatMessageLegacy>
      <ChatMessageLegacy decoration="urgent">Urgent message</ChatMessageLegacy>
      <ChatMessageLegacy decoration="mention">Message with mention</ChatMessageLegacy>
      <ChatMessageLegacy decoration="mentionEveryone">Message mentioning everyone</ChatMessageLegacy>
    </ChatLegacy>
  );
};

export { Slots } from './ChatMessageLegacySlots.stories';

export default {
  title: 'Preview Components/Legacy Chat/ChatMessageLegacy',
  component: ChatMessageLegacy,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
