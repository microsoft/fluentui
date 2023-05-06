import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TagContentState, TagContentSlots, TagContentContextValues } from './TagContent.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of TagContent
 */
export const renderTagContent_unstable = (state: TagContentState, contextValues: TagContentContextValues) => {
  const { slots, slotProps } = getSlots<TagContentSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && (
        <AvatarContextProvider value={contextValues.avatar}>
          <slots.media {...slotProps.media} />
        </AvatarContextProvider>
      )}
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {slots.primaryText && <slots.primaryText {...slotProps.primaryText}>{slotProps.root.children}</slots.primaryText>}
      {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
    </slots.root>
  );
};
