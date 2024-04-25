/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { NavContextValues } from '../NavContext.types';
import { NavProvider } from '../NavContext';
import { assertSlots } from '@fluentui/react-utilities';
import type { DrawerSlots } from '@fluentui/react-drawer';
import type { NavDrawerState } from './NavDrawer.types';

export const renderNavDrawer_unstable = (state: NavDrawerState, contextValues: NavContextValues) => {
  assertSlots<DrawerSlots>(state);
  return (
    <NavProvider value={contextValues.nav}>
      <state.root />
    </NavProvider>
  );
};
