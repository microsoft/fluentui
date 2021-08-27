import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import type { TextState } from './Text.types';

/**
 * Render the final JSX of Text
 */
export const renderText = (state: TextState) => {
  const { slots, slotProps } = getSlotsCompat(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};
