import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

import type { OverlayDrawerProps, OverlayDrawerSlots } from '../OverlayDrawer';
import type { InlineDrawerProps, InlineDrawerSlots } from '../InlineDrawer';

export type DrawerSlots = OverlayDrawerSlots | InlineDrawerSlots;

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
} & (OverlayDrawerProps | InlineDrawerProps);

/**
 * State used in rendering Drawer
 */
export type DrawerState = ComponentState<DrawerSlots>;
