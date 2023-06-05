import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToastSlots = {
  root: Slot<'div'>;
};

/**
 * Toast Props
 */
export type ToastProps = ComponentProps<ToastSlots> & {};

/**
 * State used in rendering Toast
 */
export type ToastState = ComponentState<ToastSlots>;
