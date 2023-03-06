import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TextareaState, TextareaSlots } from './Textarea.types';

/**
 * Render the final JSX of Textarea
 */
export const renderTextarea_unstable = (state: TextareaState) => {
  const { slots, slotProps } = getSlots<TextareaSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.contentAbove && <slots.contentAbove {...slotProps.contentAbove} />}
      <slots.textarea {...slotProps.textarea} />
      {slots.contentBelow && <slots.contentBelow {...slotProps.contentBelow} />}
    </slots.root>
  );
};
