import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TextareaState, TextareaSlots } from './Textarea.types';

/**
 * Render the final JSX of Textarea
 */
export const renderTextarea_unstable = (state: TextareaState) => {
  const { slots, slotProps } = getSlots<TextareaSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
