import * as React from 'react';
import { renderDrawer_unstable } from '@fluentui/react-drawer';
import { NavProvider } from '../NavContext';
import type { NavContextValues } from '../NavContext.types';
import type { DrawerState } from '@fluentui/react-drawer';
import type { NavDrawerState } from './NavDrawer.types';

export const renderNavDrawer_unstable = (state: NavDrawerState, contextValues: NavContextValues) => {
  return <NavProvider value={contextValues.nav}>{renderDrawer_unstable(state as DrawerState)}</NavProvider>;
};
