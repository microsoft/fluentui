/** @jsxImportSource @fluentui/react-jsx-runtime */

import { DrawerState, renderDrawer_unstable } from '@fluentui/react-drawer';
import { NavContextValues } from '../NavContext.types';
import { NavProvider } from '../NavContext';
import type { NavDrawerState } from './NavDrawer.types';

/**
 * Render the final JSX of NavDrawer
 */
export const renderNavDrawer_unstable = (state: NavDrawerState, contextValues: NavContextValues) => {
  return <NavProvider value={contextValues.nav}>{renderDrawer_unstable(state as DrawerState)}</NavProvider>;
};
