/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { DrawerHeaderNavigationState, DrawerHeaderNavigationSlots } from './DrawerHeaderNavigation.types';

/**
 * Render the final JSX of DrawerHeaderNavigation
 */
export const renderDrawerHeaderNavigation_unstable = (state: DrawerHeaderNavigationState) => {
  assertSlots<DrawerHeaderNavigationSlots>(state);

  return <state.root />;
};
