import * as React from 'react';
import { DialogTitleSlots } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerHeaderTitleSlots = {
  root: Slot<'div'>;

  /**
   * By default this is a h2, but can be any heading or div.
   * If `div` is provided do not forget to also provide proper `role="heading"` and `aria-level` attributes
   */
  heading?: DialogTitleSlots['root'];

  /**
   * Action slot for the close button
   */
  action?: DialogTitleSlots['action'];
};

/**
 * DrawerHeaderTitle Props
 */
export type DrawerHeaderTitleProps = ComponentProps<DrawerHeaderTitleSlots> & {
  /**
   * Content of the DrawerHeaderTitle
   * Children is mandatory because DrawerHeaderTitle is a wrapper component
   */
  children: React.ReactNode | undefined;
};

/**
 * State used in rendering DrawerHeaderTitle
 */
export type DrawerHeaderTitleState = ComponentState<DrawerHeaderTitleSlots>;
