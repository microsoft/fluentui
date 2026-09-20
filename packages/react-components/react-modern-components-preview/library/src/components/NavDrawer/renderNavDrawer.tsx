/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { NavProvider } from '@fluentui/react-headless-components-preview/nav';
import type { NavContextValues } from '../Nav/Nav.types';
import type { NavDrawerSlots, NavDrawerState } from './NavDrawer.types';

export const renderNavDrawer = (state: NavDrawerState, contextValues: NavContextValues): JSXElement => {
  assertSlots<NavDrawerSlots>(state);

  return (
    <NavProvider value={contextValues.nav}>
      <state.root />
    </NavProvider>
  );
};
