import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { FieldComponent, FieldSlots, FieldState } from './Field.types';

/**
 * Render the final JSX of Field
 */
export const renderField_unstable = <T extends FieldComponent>(state: FieldState<T>) => {
  const { slots, slotProps } = getSlots<FieldSlots<FieldComponent>>(state as FieldState<FieldComponent>);

  return (
    <slots.root {...slotProps.root}>
      {slots.label && <slots.label {...slotProps.label} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {slots.control && <slots.control {...(slotProps.control as any)} />}
      {slots.validationMessage && (
        <slots.validationMessage {...slotProps.validationMessage}>
          {slots.validationMessageIcon && <slots.validationMessageIcon {...slotProps.validationMessageIcon} />}
          {slotProps.validationMessage.children}
        </slots.validationMessage>
      )}
      {slots.hint && <slots.hint {...slotProps.hint} />}
    </slots.root>
  );
};
