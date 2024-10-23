/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { NavProvider } from '../NavContext';
import type { NavContextValues } from '../NavContext.types';
import type { NavDrawerSlots, NavDrawerState } from './NavDrawer.types';

export const renderNavDrawer_unstable = (state: NavDrawerState, contextValues: NavContextValues) => {
  assertSlots<NavDrawerSlots>(state);

  return (
    <NavProvider value={contextValues.nav}>
      <state.root />
    </NavProvider>
  );
};
