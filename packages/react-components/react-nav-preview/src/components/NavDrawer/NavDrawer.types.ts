import { DrawerProps, DrawerState } from '@fluentui/react-drawer';
import { NavProps } from '../Nav/Nav.types';
import { NavContextValue } from '../NavContext.types';

/**
 * NavDrawer Props
 */
export type NavDrawerProps = DrawerProps & NavProps;

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = DrawerState & NavContextValue & { type: 'inline' | 'overlay' };
