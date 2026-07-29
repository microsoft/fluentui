import type { ToastBaseState } from '@fluentui/react-toast';
export type { ToastSlots, ToastBaseProps as ToastProps } from '@fluentui/react-toast';

export type ToastState = ToastBaseState & {
  root: {
    /**
     * Indicates the semantic intent or status of the toast notification, determining visual styling and messaging context.
     * Common values include: 'success', 'error', 'warning', 'info'.
     */
    'data-intent'?: string;
  };
};
