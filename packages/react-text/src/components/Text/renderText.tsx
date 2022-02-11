import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TextSlots, TextRender } from './Text.types';

/**
 * Render the final JSX of Text
 */
export const renderText_unstable: TextRender = state => {
  const { slots, slotProps } = getSlots<TextSlots>(state);

  return <slots.root {...slotProps.root} />;
};
