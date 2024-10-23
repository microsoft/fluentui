/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';

import type { DrawerHeaderNavigationSlots, DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';

/**
 * Render the final JSX of DrawerHeaderNavigation
 */
export const renderDrawerHeaderNavigation_unstable = (state: DrawerHeaderNavigationState) => {
  assertSlots<DrawerHeaderNavigationSlots>(state);

  return <state.root />;
};
