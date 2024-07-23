import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogTitleSlots = {
  /**
   * By default this is a h2, but can be any heading or div,
   * if `div` is provided do not forget to also provide proper `role="heading"` and `aria-level` attributes
   */
  root: Slot<'h2', 'h1' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'>;
  /**
   * By default a Dialog with modalType='non-modal' will have a close button action
   */
  action?: Slot<'div'>;
};

/**
 * DialogTitle Props
 */
export type DialogTitleProps = ComponentProps<DialogTitleSlots>;

/**
 * State used in rendering DialogTitle
 */
export type DialogTitleState = ComponentState<DialogTitleSlots>;
