/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import type { AriaLiveState, AriaLiveSlots } from './AriaLive.types';
import { assertSlots } from '@fluentui/react-utilities';

/**
 * Render the final JSX of AriaLive
 */
export const renderAriaLive_unstable = (state: AriaLiveState) => {
  assertSlots<AriaLiveSlots>(state);

  return (
    <>
      <state.assertive />
      <state.polite />
    </>
  );
};
