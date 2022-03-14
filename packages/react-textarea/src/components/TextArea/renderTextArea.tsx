import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TextAreaState, TextAreaSlots } from './TextArea.types';

/**
 * Render the final JSX of TextArea
 */
export const renderTextArea_unstable = (state: TextAreaState) => {
  const { slots, slotProps } = getSlots<TextAreaSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.textArea {...slotProps.textArea} />
    </slots.root>
  );
};
