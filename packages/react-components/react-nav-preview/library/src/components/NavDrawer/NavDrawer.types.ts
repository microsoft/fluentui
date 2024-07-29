import { DrawerProps, DrawerSlots, DrawerState } from '@fluentui/react-drawer';
import { ComponentProps, DistributiveOmit } from '@fluentui/react-utilities';
import { NavProps } from '../Nav/Nav.types';
import { NavContextValue } from '../NavContext.types';

/**
 * NavDrawer slots
 */
export type NavDrawerSlots = DrawerSlots;

/**
 * NavDrawer Props
 */
export type NavDrawerProps = ComponentProps<NavDrawerSlots> & DistributiveOmit<DrawerProps, 'ref'> & NavProps;

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = DrawerState & NavContextValue;
