/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';

import type { DrawerState, DrawerSlots } from './Drawer.types';

/**
 * Render the final JSX of Drawer
 */
export const renderDrawer_unstable = (state: DrawerState) => {
  assertSlots<DrawerSlots>(state);

  return <state.root />;
};
