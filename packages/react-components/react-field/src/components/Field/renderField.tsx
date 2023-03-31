import * as React from 'react';

import { getSlots } from '@fluentui/react-utilities';
import { FieldContextProvider, getFieldControlProps } from '../../contexts/index';
import type { FieldContextValues, FieldSlots, FieldState } from './Field.types';

/**
 * Render the final JSX of Field
 */
export const renderField_unstable = (state: FieldState, contextValues?: FieldContextValues) => {
  const { slots, slotProps } = getSlots<FieldSlots>(state);

  let { children } = state;
  if (typeof children === 'function') {
    children = children(getFieldControlProps(contextValues?.field) || {});
  }

  return (
    <FieldContextProvider value={contextValues?.field}>
      <slots.root {...slotProps.root}>
        {slots.label && <slots.label {...slotProps.label} />}
        {children}
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
