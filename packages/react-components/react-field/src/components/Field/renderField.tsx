import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { FieldState, FieldSlots, FieldContextValues } from './Field.types';
import { FieldContext } from '../../contexts/FieldContext';

/**
 * Render the final JSX of Field
 */
export const renderField_unstable = (state: FieldState, contextValues: FieldContextValues) => {
  const { slots, slotProps } = getSlots<FieldSlots>(state);

  return (
    <FieldContext.Provider value={contextValues.field}>
      <slots.root {...slotProps.root}>
        {slots.label && <slots.label {...slotProps.label} />}
        {slotProps.root.children}
        {/* <slots.wrapper {...slotProps.wrapper} /> */}
        {slots.statusText && (
          <slots.statusText {...slotProps.statusText}>
            {slots.statusIcon && <slots.statusIcon {...slotProps.statusIcon} />}
            {slotProps.statusText.children}
          </slots.statusText>
        )}
        {slots.helperText && <slots.helperText {...slotProps.helperText} />}
      </slots.root>
    </FieldContext.Provider>
  );
};
