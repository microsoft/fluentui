import { getSlots } from '@fluentui/react-components';
import * as React from 'react';

import type { ChatMyMessageLegacySlots, ChatMyMessageLegacyState } from './ChatMyMessageLegacy.types';

export const renderChatMyMessageLegacy_unstable = (state: ChatMyMessageLegacyState) => {
  const { slots, slotProps } = getSlots<ChatMyMessageLegacySlots>(state);
  return (
    <slots.root {...slotProps.root}>
      <slots.body {...slotProps.body}>
        <div className={state.nameLineClassName}>
          {slots.author && <slots.author {...slotProps.author} />}
          {slots.timestamp && <slots.timestamp {...slotProps.timestamp} />}
          {slots.details && !slots.statusMessage && <slots.details {...slotProps.details} />}
          {slots.statusMessage && <slots.statusMessage {...slotProps.statusMessage} />}
        </div>

        {slots.decorationLabel && <slots.decorationLabel {...slotProps.decorationLabel} />}

        {slotProps.body.children}

        {slots.decorationIcon && <slots.decorationIcon {...slotProps.decorationIcon} />}

        {slots.reactions && <slots.reactions {...slotProps.reactions} />}
      </slots.body>

      {slots.statusIcon && <slots.statusIcon {...slotProps.statusIcon} />}

      {slots.actions && <slots.actions {...slotProps.actions} />}
    </slots.root>
  );
};
