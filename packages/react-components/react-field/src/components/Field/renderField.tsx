import * as React from 'react';
import { InfoButtonContextProvider } from '@fluentui/react-infobutton';
import { getSlots } from '@fluentui/react-utilities';
import type { FieldContextValues, FieldSlots, FieldState } from './Field.types';

/**
 * Render the final JSX of Field
 */
export const renderField_unstable = (state: FieldState, contextValues: FieldContextValues) => {
  const { slots, slotProps } = getSlots<FieldSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.infoButton ? (
        <slots.infoButton {...slotProps.infoButton}>
          {slots.label && <slots.label {...slotProps.label} />}
          <InfoButtonContextProvider value={contextValues.infoButton}>
            {slotProps.infoButton.children}
          </InfoButtonContextProvider>
        </slots.infoButton>
      ) : (
        slots.label && <slots.label {...slotProps.label} />
      )}
      {slotProps.root.children}
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
