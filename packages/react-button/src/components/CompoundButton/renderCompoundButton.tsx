import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { compoundButtonShorthandPropsCompat } from './useCompoundButton';
import type { CompoundButtonState } from './CompoundButton.types';

/**
 * Renders a CompoundButton component by passing the state defined props to the appropriate slots.
 */
export const renderCompoundButton = (state: CompoundButtonState) => {
  const { slots, slotProps } = getSlotsCompat(state, compoundButtonShorthandPropsCompat);
  const { children, iconOnly, iconPosition } = state;

  return (
    <slots.root {...slotProps.root}>
      {/*loading && <slots.loader {...slotProps.loader} />*/}
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && (
        <slots.contentContainer {...slotProps.contentContainer}>
          {children}
          <slots.secondaryContent {...slotProps.secondaryContent} />
        </slots.contentContainer>
      )}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
