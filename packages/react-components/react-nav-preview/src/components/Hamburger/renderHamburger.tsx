/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { HamburgerState, HamburgerSlots } from './Hamburger.types';

/**
 * Render the final JSX of Hamburger
 */
export const renderHamburger_unstable = (state: HamburgerState) => {
  assertSlots<HamburgerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
