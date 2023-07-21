/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from './Text.types';

/**
 * Render the final JSX of Text
 */
export const renderText_unstable = (state: TextState) => {
  const { slots, slotProps } = getSlotsNext<TextSlots>(state);

  return <slots.root {...slotProps.root} />;
};
