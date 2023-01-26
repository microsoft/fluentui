import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { FieldMessageState, FieldMessageSlots } from './FieldMessage.types';

/**
 * Render the final JSX of FieldMessage
 */
export const renderFieldMessage_unstable = (state: FieldMessageState) => {
  const { slots, slotProps } = getSlots<FieldMessageSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {slotProps.root.children}
    </slots.root>
  );
};
