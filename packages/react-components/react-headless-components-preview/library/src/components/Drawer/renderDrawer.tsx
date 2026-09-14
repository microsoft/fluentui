import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DrawerState } from './Drawer.types';

/**
 * Renders the final JSX of the Drawer component, given the state.
 */
export const renderDrawer = (state: DrawerState): JSXElement => {
  const Root = state.components.root;

  return <Root {...state.root} />;
};
