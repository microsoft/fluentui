/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { NavState, NavSlots } from './Nav.types';

/**
 * Render the final JSX of Nav
 */
export const renderNav_unstable = (state: NavState) => {
  assertSlots<NavSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
