import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ChatMessageLegacyState, ChatMessageLegacySlots } from './ChatMessageLegacy.types';

/**
 * Render the final JSX of ChatMessageLegacy
 */
export const renderChatMessageLegacy_unstable = (state: ChatMessageLegacyState) => {
  const { slots, slotProps } = getSlots<ChatMessageLegacySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.avatar && <slots.avatar {...slotProps.avatar} />}

      <slots.body {...slotProps.body}>
        <div className={state.nameLineClassName}>
          {slots.author && <slots.author {...slotProps.author} />}
          {slots.timestamp && <slots.timestamp {...slotProps.timestamp} />}
          {slots.details && <slots.details {...slotProps.details} />}
        </div>

        {slots.decorationLabel && <slots.decorationLabel {...slotProps.decorationLabel} />}

        {slotProps.body.children}

        {slots.decorationIcon && <slots.decorationIcon {...slotProps.decorationIcon} />}

        {slots.reactions && <slots.reactions {...slotProps.reactions} />}
      </slots.body>
    </slots.root>
  );
};
