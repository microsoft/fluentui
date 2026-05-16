import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { NavProvider } from '../navContext';
import type { NavContextValues } from '../navContext';
import type { NavDrawerState } from './NavDrawer.types';

export const renderNavDrawer = (state: NavDrawerState, contextValues: NavContextValues): JSXElement => {
  const Root = state.components.root;

  return (
    <NavProvider value={contextValues.nav}>
      <Root {...state.root} />
    </NavProvider>
  );
};
