import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { CompoundButtonState } from './CompoundButton.types';
import { compoundButtonShorthandProps } from './useCompoundButton';

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderCompoundButton = (state: CompoundButtonState) => {
  const { slots, slotProps } = getSlots(state, compoundButtonShorthandProps);
  const { loading, iconPosition, iconOnly } = state;

  return (
    <slots.root {...slotProps.root}>
      {loading && <slots.loader {...slotProps.loader} />}
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && (
        <slots.contentContainer {...slotProps.contentContainer}>
          <slots.content {...slotProps.content} />
          <slots.secondaryContent {...slotProps.secondaryContent} />
        </slots.contentContainer>
      )}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
