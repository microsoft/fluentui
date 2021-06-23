import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CompoundButtonState } from './CompoundButton.types';
import { compoundButtonShorthandProps } from './useCompoundButton';

/**
 * Renders a CompoundButton component by passing the state defined props to the appropriate slots.
 */
export const renderCompoundButton = (state: CompoundButtonState) => {
  const { slots, slotProps } = getSlots(state, compoundButtonShorthandProps);
  const { /*loading,*/ iconPosition, iconOnly } = state;

  return (
    <slots.root {...slotProps.root}>
      {/*loading && <slots.loader {...slotProps.loader} />*/}
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && (
        <slots.contentContainer {...slotProps.contentContainer}>
          <slots.children {...slotProps.children} />
          <slots.secondaryContent {...slotProps.secondaryContent} />
        </slots.contentContainer>
      )}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
