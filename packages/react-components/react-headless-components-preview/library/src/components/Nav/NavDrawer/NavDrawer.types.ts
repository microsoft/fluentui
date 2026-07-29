import type { Drawer, DrawerProps } from '../../Drawer';
import type { NavProps } from '../Nav.types';
import type { NavContextValue } from '../navContext';
import type { ComponentState, Slot } from '@fluentui/react-utilities';

export type NavDrawerSlots = {
  /**
   * The root of the NavDrawer which contains the navigation items.
   */
  root: Slot<typeof Drawer>;
};

/**
 * NavDrawer Props
 */
export type NavDrawerProps = DrawerProps & NavProps;

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = ComponentState<NavDrawerSlots> & Omit<NavContextValue, 'tabbable'>;
