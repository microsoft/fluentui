import * as React from 'react';
import descriptionMd from './Description.md';
import { ChatLegacy, ChatMyMessageLegacy } from '@fluentui/react-migration-v0-v9';

export const ChatMyMessage = () => {
  return (
    <ChatLegacy>
      <ChatMyMessageLegacy>Nice to meet you!</ChatMyMessageLegacy>
    </ChatLegacy>
  );
};

export const ChatMyMessageDecoration = () => {
  return (
    <ChatLegacy>
      <ChatMyMessageLegacy decoration="important">Important message</ChatMyMessageLegacy>
      <ChatMyMessageLegacy decoration="urgent">Urgent message</ChatMyMessageLegacy>
    </ChatLegacy>
  );
};

export const ChatMyMessageStatus = () => {
  return (
    <ChatLegacy>
      <ChatMyMessageLegacy status="failed">Feiled message</ChatMyMessageLegacy>
      <ChatMyMessageLegacy status="sending">Sending message</ChatMyMessageLegacy>
      <ChatMyMessageLegacy status="received">Received message</ChatMyMessageLegacy>
      <ChatMyMessageLegacy status="read">Read message</ChatMyMessageLegacy>
      <ChatMyMessageLegacy status="blocked">Blocked message</ChatMyMessageLegacy>
      <ChatMyMessageLegacy status="scheduled">Scheduled message</ChatMyMessageLegacy>
    </ChatLegacy>
  );
};

export { Slots } from './ChatMessageLegacySlots.stories';

export default {
  title: 'Preview Components/Legacy Chat/ChatMyMessageLegacy',
  component: ChatMyMessageLegacy,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
