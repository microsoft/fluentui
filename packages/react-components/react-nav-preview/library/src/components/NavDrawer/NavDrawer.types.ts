import { DrawerProps, DrawerSlots, DrawerState } from '@fluentui/react-drawer';
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
export type NavDrawerProps = ComponentProps<NavDrawerSlots> &
  DrawerProps &
  NavProps & {
    /**
     * The component uses arrow navigation by default.
     * Setting this to true enables tab AND arrow navigation.
     * @default false
     */
    tabbable?: boolean;
  };

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = DrawerState &
  NavContextValue & {
    /**
     * Analagous to size from DrawerBaseProps.
     * Intended to be left unset in most cases.
     * If left unset, it defaults to 260px.
     */
    size?: 'small' | 'medium' | 'large' | 'full';
  };
