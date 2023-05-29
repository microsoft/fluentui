/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { AriaLiveState, AriaLiveSlots } from './AriaLive.types';

/**
 * Render the final JSX of AriaLive
 */
export const renderAriaLive_unstable = (state: AriaLiveState) => {
  const { slots, slotProps } = getSlotsNext<AriaLiveSlots>(state);

  return (
    <>
      <slots.assertive {...slotProps.assertive} />
      <slots.polite {...slotProps.polite} />
    </>
  );
};
