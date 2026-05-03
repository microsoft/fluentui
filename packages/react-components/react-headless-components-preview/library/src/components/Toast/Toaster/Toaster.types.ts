import type { ToastData, ToastId, ToastPosition, ToasterId } from '@fluentui/react-toast';

/**
 * Headless Toaster props. Position, offset, and aria-live are omitted because
 * the Popover API places each toast in the browser top layer independently —
 * consumers control position through CSS (e.g. :popover-open { inset: auto; ... }).
 */
export type ToasterProps = {
  toasterId?: ToasterId;
};

export type ToasterState = {
  toastsToRender: Map<ToastPosition, ToastData[]>;
  isToastVisible: (toastId: ToastId) => boolean;
  tryRestoreFocus: () => void;
  getStackTransform: (position: ToastPosition, stackIndex: number) => string;
};
