/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AriaLiveState, AriaLiveSlots } from './AriaLive.types';

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
