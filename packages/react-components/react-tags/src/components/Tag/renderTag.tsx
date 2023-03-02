import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TagState, TagSlots } from './Tag.types';

/**
 * Render the final JSX of Tag
 */
export const renderTag_unstable = (state: TagState) => {
  const { slots, slotProps } = getSlots<TagSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      {slots.content && (
        <slots.content {...slotProps.content}>
          {slots.persona && <slots.persona {...slotProps.persona} />}
          {slots.icon && <slots.icon {...slotProps.icon} />}
          {slots.primaryText && <slots.primaryText {...slotProps.primaryText} />}
          {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
        </slots.content>
      )}
      {slots.dismiss && <slots.dismiss {...slotProps.dismiss} />}
    </slots.root>
  );
};
