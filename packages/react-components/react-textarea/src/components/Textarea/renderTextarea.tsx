/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { TextareaState, TextareaSlots } from './Textarea.types';

/**
 * Render the final JSX of Textarea
 */
export const renderTextarea_unstable = (state: TextareaState) => {
  const { slots, slotProps } = getSlotsNext<TextareaSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.textarea {...slotProps.textarea} />
    </slots.root>
  );
};
