import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ToastContextValue } from '../../contexts/toastContext';

export type ToastTitleSlots = {
  root: NonNullable<Slot<'div'>>;
  media?: Slot<'div'>;
  action?: Slot<'div'>;
};

/**
 * ToastTitle Props
 */
export type ToastTitleProps = ComponentProps<ToastTitleSlots> & {};

/**
 * State used in rendering ToastTitle
 */
export type ToastTitleState = ComponentState<ToastTitleSlots> & Pick<ToastContextValue, 'intent'>;
