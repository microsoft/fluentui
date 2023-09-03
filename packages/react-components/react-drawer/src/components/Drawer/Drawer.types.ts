import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DrawerOverlayProps } from '../DrawerOverlay/DrawerOverlay.types';
import { DrawerInlineProps } from '../DrawerInline/DrawerInline.types';

export type DrawerSlots = {
  /**
   * Root slot of the Drawer.
   */
  root: Slot<DrawerOverlayProps | DrawerInlineProps>;
};

/**
 * Drawer Props
 */
export type DrawerProps = ComponentProps<DrawerSlots> & {
  /**
   * Type of the drawer.
   * @default overlay
   *
   * - 'overlay' - Drawer is hidden by default and can be opened by clicking on the trigger.
   * - 'inline' - Drawer is stacked with the content
   */
  type?: 'inline' | 'overlay';
};

/**
 * State used in rendering Drawer
 */
export type DrawerState = ComponentState<DrawerSlots>;
