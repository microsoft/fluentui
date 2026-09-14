/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type { JSXElement } from '@fluentui/react-utilities';
import { assertSlots } from '@fluentui/react-utilities';

import { NavProvider } from '../navContext';
import type { NavContextValues } from '../navContext';
import type { NavDrawerSlots, NavDrawerState } from './NavDrawer.types';

export const renderNavDrawer = (state: NavDrawerState, contextValues: NavContextValues): JSXElement => {
  assertSlots<NavDrawerSlots>(state);

  return (
    <NavProvider value={contextValues.nav}>
      <state.root />
    </NavProvider>
  );
};
