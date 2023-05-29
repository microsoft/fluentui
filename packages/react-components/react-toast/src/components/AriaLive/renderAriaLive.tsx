/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { AriaLiveState, AriaLiveSlots } from './AriaLive.types';

/**
 * Render the final JSX of AriaLive
 */
export const renderAriaLive_unstable = (state: AriaLiveState) => {
  const { slots, slotProps } = getSlotsNext<AriaLiveSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.assertive {...slotProps.assertive} />
      <slots.polite {...slotProps.polite} />
    </slots.root>
  );
};
