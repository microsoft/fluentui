import * as React from 'react';

import { getSlots } from '@fluentui/react-utilities';
import { FieldContextProvider } from '../../contexts/FieldContext';
import type { FieldContextValues, FieldSlots, FieldState } from './Field.types';

/**
 * Render the final JSX of Field
 */
export const renderField_unstable = (state: FieldState, context: FieldContextValues) => {
  const { slots, slotProps } = getSlots<FieldSlots>(state);

  return (
    <FieldContextProvider value={context.field}>
      <slots.root {...slotProps.root}>
        {slots.label && <slots.label {...slotProps.label} />}
        {slotProps.root.children}
        {slots.validationMessage && (
          <slots.validationMessage {...slotProps.validationMessage}>
            {slots.validationMessageIcon && <slots.validationMessageIcon {...slotProps.validationMessageIcon} />}
            {slotProps.validationMessage.children}
          </slots.validationMessage>
        )}
        {slots.hint && <slots.hint {...slotProps.hint} />}
      </slots.root>
    </FieldContextProvider>
  );
};
