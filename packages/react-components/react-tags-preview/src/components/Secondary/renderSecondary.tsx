/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { SecondaryState, SecondarySlots } from './Secondary.types';

/**
 * Render the final JSX of Secondary
 */
export const renderSecondary_unstable = (state: SecondaryState) => {
  const { slots, slotProps } = getSlotsNext<SecondarySlots>(state);

  return <slots.root {...slotProps.root} />;
};
