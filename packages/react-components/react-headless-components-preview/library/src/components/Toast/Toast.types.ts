import type { ComponentProps, ComponentState, EventHandler, Slot } from '@fluentui/react-utilities';
import type { ToastContextValue, ToastIntent, ToastOpenChangeData } from './toastContext';

export type { ToastIntent, ToastOpenChangeData };

export type ToastSlots = {
  root: Slot<'div'>;
};

export type ToastProps = ComponentProps<ToastSlots> & {
  /** Whether the toast is currently visible. Use with `onOpenChange` for controlled mode. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Called when the toast should open or close. */
  onOpenChange?: EventHandler<ToastOpenChangeData>;
  /** Semantic intent — affects accessible role and default icon in ToastTitle. */
  intent?: ToastIntent;
  /**
   * Auto-dismiss timeout in milliseconds.
   * Negative value disables auto-dismiss (default: -1).
   */
  timeout?: number;
};

export type ToastState = ComponentState<ToastSlots> & {
  open: boolean;
  intent: ToastIntent | undefined;
  bodyId: string;
  titleId: string;
  requestOpenChange: ToastContextValue['requestOpenChange'];
};

export type ToastContextValues = {
  toast: ToastContextValue;
};
