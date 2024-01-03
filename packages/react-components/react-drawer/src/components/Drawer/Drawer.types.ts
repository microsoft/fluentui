import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

import type { OverlayDrawerProps } from '../OverlayDrawer';
import type { InlineDrawerProps } from '../InlineDrawer';

export type DrawerSlots = {
  /**
   * Root slot of the Drawer.
   */
  root: Slot<OverlayDrawerProps | InlineDrawerProps>;
};

/**
 * Drawer Props
 */
export type DrawerProps = ComponentProps<DrawerSlots> & {
  /**
   * Type of the drawer.
   *
   * - 'overlay' - Drawer is hidden by default and can be opened by clicking on the trigger.
   * - 'inline' - Drawer is stacked with the content
   *
   * @default overlay
   */
  type?: 'inline' | 'overlay';
};

/**
 * State used in rendering Drawer
 */
export type DrawerState = ComponentState<DrawerSlots>;
