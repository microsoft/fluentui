import type * as React from 'react';
import type { ComponentProps } from '@fluentui/react-utilities';
import type { InlineDrawerProps, InlineDrawerSlots } from './InlineDrawer';
import type { OverlayDrawerProps, OverlayDrawerSlots } from './OverlayDrawer';

export type DrawerSlots = Pick<OverlayDrawerSlots, 'root'> | Pick<InlineDrawerSlots, 'root'>;

export type DrawerProps = ComponentProps<DrawerSlots> & {
  /**
   * Type of the drawer.
   *
   * - 'overlay' - Drawer is hidden by default and can be opened by clicking on the trigger.
   * - 'inline' - Drawer is stacked with the content.
   *
   * @default overlay
   */
  type?: 'inline' | 'overlay';
} & (OverlayDrawerProps | InlineDrawerProps);

export type DrawerState = {
  components: {
    root: React.FC<InlineDrawerProps | OverlayDrawerProps>;
  };
  root: InlineDrawerProps | OverlayDrawerProps;
};
