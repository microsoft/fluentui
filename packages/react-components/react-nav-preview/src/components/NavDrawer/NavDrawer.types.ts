import { DrawerProps, DrawerState } from '@fluentui/react-drawer';
import { ComponentProps, Slot } from '@fluentui/react-utilities';
import { NavProps } from '../Nav/Nav.types';
import { NavContextValue } from '../NavContext.types';

/**
 * NavDrawer slots
 */
export type NavDrawerSlots = {
  /**
   * Slot for the root element.
   */
  root: Slot<DrawerProps>;
};

/**
 * NavDrawer Props
 */
export type NavDrawerProps = ComponentProps<NavDrawerSlots> & NavProps;

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = DrawerState & NavContextValue;
