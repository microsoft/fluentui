import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { CompoundButtonState } from './CompoundButton.types';
import { compoundButtonShorthandPropsCompat } from './useCompoundButton';

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
