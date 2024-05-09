/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavDrawerFooterState, NavDrawerFooterSlots } from './NavDrawerFooter.types';

/**
 * Render the final JSX of NavDrawerFooter
 */
export const renderNavDrawerFooter_unstable = (state: NavDrawerFooterState) => {
  assertSlots<NavDrawerFooterSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
