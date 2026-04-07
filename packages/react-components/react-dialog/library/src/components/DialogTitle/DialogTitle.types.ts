import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonProps } from '@fluentui/react-button';

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
export type DialogTitleProps = ComponentProps<DialogTitleSlots> & {
  /**
   * Props to customise the default close button rendered in the `action` slot
   * for non-modal dialogs. Has no effect when `action` is explicitly provided.
   * Use `action` to replace close button with other action element.
   */
  closeButton?: ButtonProps;
};

/**
 * State used in rendering DialogTitle
 */
export type DialogTitleState = ComponentState<DialogTitleSlots>;
