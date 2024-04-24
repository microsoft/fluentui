/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { DrawerSlots } from '@fluentui/react-drawer';
import { NavContextValues } from '../NavContext.types';
import { NavProvider } from '../NavContext';
import type { NavDrawerState } from './NavDrawer.types';

/**
 * Render the final JSX of NavDrawer
 */
export const renderNavDrawer_unstable = (state: NavDrawerState, contextValues: NavContextValues) => {
  assertSlots<DrawerSlots>(state);

  return (
    <NavProvider value={contextValues.nav}>
      <state.root />
    </NavProvider>
  );
};
