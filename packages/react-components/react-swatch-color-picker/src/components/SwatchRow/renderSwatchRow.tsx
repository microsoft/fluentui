/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { SwatchRowState, SwatchRowSlots } from './SwatchRow.types';

/**
 * Render the final JSX of SwatchRow
 */
export const renderSwatchRow_unstable = (state: SwatchRowState) => {
  const { slots, slotProps } = getSlotsNext<SwatchRowSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
