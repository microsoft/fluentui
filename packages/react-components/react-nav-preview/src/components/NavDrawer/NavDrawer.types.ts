import { DrawerSlots, DrawerState, InlineDrawerProps, OverlayDrawerProps } from '@fluentui/react-drawer';
import { ComponentProps } from '@fluentui/react-utilities';
import { NavProps } from '../Nav/Nav.types';
import { NavContextValue } from '../NavContext.types';

/**
 * NavDrawer slots
 */
export type NavDrawerSlots = DrawerSlots;

/**
 * NavDrawer Props
 */
export type NavDrawerProps = ComponentProps<NavDrawerSlots> & InlineDrawerProps & OverlayDrawerProps & NavProps;

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = DrawerState & NavContextValue & Pick<InlineDrawerProps, 'separator' | 'position'>;
