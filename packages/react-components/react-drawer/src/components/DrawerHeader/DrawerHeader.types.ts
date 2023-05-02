import * as React from 'react';
import { DialogTitleSlots } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerHeaderSlots = {
  /**
   * The root of the DrawerHeader.
   */
  root: Slot<'header'>;

  /**
   * The title header of the drawer.
   */
  header?: DialogTitleSlots['root'];

  /**
   * The drawer navigation region.
   */
  navigation?: Slot<'nav'>;
};

/**
 * DrawerHeader Props
 */
export type DrawerHeaderProps = ComponentProps<DrawerHeaderSlots>;

/**
 * State used in rendering DrawerHeader
 */
export type DrawerHeaderState = ComponentState<DrawerHeaderSlots> & {
  content: React.HTMLAttributes<HTMLDivElement>;
};
