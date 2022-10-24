import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogTitleSlots = {
  /**
   * By default this is a div, but can be a heading.
   */
  root: Slot<'div', 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
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
