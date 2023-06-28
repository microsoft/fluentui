import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ToastContextValue } from '../../contexts/toastContext';

export type ToastSlots = {
  root: Slot<'div'>;
};

export type ToastContextValues = {
  toast: ToastContextValue;
};

/**
 * Toast Props
 */
export type ToastProps = ComponentProps<ToastSlots> & Pick<ToastContextValue, 'appearance'>;

/**
 * State used in rendering Toast
 */
export type ToastState = ComponentState<ToastSlots> & Pick<ToastProps, 'appearance'>;
