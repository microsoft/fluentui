import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  NavDrawerProps as NavDrawerBaseProps,
  NavDrawerState as NavDrawerBaseState,
} from '@fluentui/react-headless-components-preview/nav';
import type { Drawer } from '../../Drawer/Drawer/Drawer';
import type { DrawerSize, DrawerSurfaceMotionSlots } from '../../Drawer/Drawer/Drawer.types';
import type { NavDensity, NavState } from '../Nav/Nav.types';

export type NavDrawerSlots = {
  root: Slot<typeof Drawer>;
};

export type NavDrawerProps = NavDrawerBaseProps &
  Partial<DrawerSurfaceMotionSlots> & {
    /**
     * The vertical density of the NavDrawer and its children.
     *
     * @default 'medium'
     */
    density?: NavDensity;

    /**
     * Size of the drawer. When omitted, NavDrawer uses its 260px default width.
     */
    size?: DrawerSize;

    /** Whether an inline drawer has a separator line. */
    separator?: boolean;

    /** Enables both tab and arrow navigation among items. */
    tabbable?: boolean;
  };

export type NavDrawerState = Omit<NavDrawerBaseState, 'components' | 'root'> &
  ComponentState<NavDrawerSlots> &
  Pick<NavState, 'density' | 'tabbable'> & {
    size?: DrawerSize;
    root: ComponentState<NavDrawerSlots>['root'] & {
      'data-nav-default-size'?: '';
      'data-type': 'inline' | 'overlay';
    };
  };
