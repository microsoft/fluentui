import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToastLayoutSlots = {
  root: Slot<'div'>;
};

/**
 * ToastLayout Props
 */
export type ToastLayoutProps = ComponentProps<ToastLayoutSlots> & {};

/**
 * State used in rendering ToastLayout
 */
export type ToastLayoutState = ComponentState<ToastLayoutSlots>;
