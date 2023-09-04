import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerHeaderTitleSlots = {
  root: Slot<'div'>;

  /**
   * By default this is a h2, but can be any heading or div.
   * If `div` is provided do not forget to also provide proper `role="heading"` and `aria-level` attributes
   */
  heading?: Slot<'h2', 'h1' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'>;

  /**
   * Action slot for the close button
   */
  action?: Slot<'div'>;
};

/**
 * DrawerHeaderTitle Props
 */
export type DrawerHeaderTitleProps = ComponentProps<DrawerHeaderTitleSlots>;

/**
 * State used in rendering DrawerHeaderTitle
 */
export type DrawerHeaderTitleState = ComponentState<DrawerHeaderTitleSlots>;
