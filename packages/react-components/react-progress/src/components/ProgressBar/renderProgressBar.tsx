/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { ProgressBarState, ProgressBarSlots } from './ProgressBar.types';

/**
 * Render the final JSX of ProgressBar
 */
export const renderProgressBar_unstable = (state: ProgressBarState) => {
  const { slots, slotProps } = getSlotsNext<ProgressBarSlots>(state);
  return <slots.root {...slotProps.root}>{slots.bar && <slots.bar {...slotProps.bar} />}</slots.root>;
};
