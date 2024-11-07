import { DrawerProps, DrawerSlots, DrawerState } from '@fluentui/react-drawer';
import { ComponentProps } from '@fluentui/react-utilities';
import { NavProps } from '../Nav/Nav.types';
import { NavContextValue } from '../NavContext.types';
import { TabsterDOMAttribute } from '@fluentui/react-tabster/src/index';

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
     * An optional tabster attribute to let consumers override keyboard navigation behavior.
     * @default axis: 'vertical', circular: true
     */
    tabsterDomAttribute?: TabsterDOMAttribute;
  };

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = DrawerState & NavContextValue;
