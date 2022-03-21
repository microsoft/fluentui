import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';

/**
 * Renders a CompoundButton component by passing the state defined props to the appropriate slots.
 */
export const renderCompoundButton_unstable = (state: CompoundButtonState) => {
  const { slots, slotProps } = getSlots<CompoundButtonSlots>(state);
  const { iconOnly, iconPosition } = state;

  return (
    <slots.root {...slotProps.root}>
      {iconPosition !== 'after' && slots.icon && <slots.icon {...slotProps.icon} />}
      {!iconOnly && (
        <slots.contentContainer {...slotProps.contentContainer}>
          {slotProps.root.children}
          {slots.secondaryContent && <slots.secondaryContent {...slotProps.secondaryContent} />}
        </slots.contentContainer>
      )}
      {iconPosition === 'after' && slots.icon && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
