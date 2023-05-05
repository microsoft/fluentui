import * as React from 'react';

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastContentProps<Data = {}> {
  closeToast?: () => void;
  toastProps: ToastProps;
  data?: Data;
}

export type ToastContent<T = unknown> = React.ReactNode | ((props: ToastContentProps<T>) => React.ReactNode);

export type Id = number | string;

export interface ClearWaitingQueueParams {
  containerId?: Id;
}

interface CommonOptions {
  /**
   * Pause the timer when the mouse hover the toast.
   * `Default: true`
   */
  pauseOnHover?: boolean;

  /**
   * Pause the toast when the window loses focus.
   * `Default: true`
   */
  pauseOnFocusLoss?: boolean;

  /**
   * Remove the toast when clicked.
   * `Default: true`
   */
  closeOnClick?: boolean;

  /**
   * Set the delay in ms to close the toast automatically.
   * Use `false` to prevent the toast from closing.
   * `Default: 5000`
   */
  autoClose?: number | false;

  /**
   * Set the default position to use.
   * `One of: 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'`
   * `Default: 'top-right'`
   */
  position?: ToastPosition;

  /**
   * Set id to handle multiple container
   */
  containerId?: Id;

  /**
   * Support right to left display.
   * `Default: false`
   */
  rtl?: boolean;
}

export interface ToastOptions<Data = {}> extends CommonOptions {
  /**
   * An optional inline style to apply.
   */
  style?: React.CSSProperties;

  /**
   * Set the toast type.
   * `One of: 'info', 'success', 'warning', 'error', 'default'`
   */
  type?: TypeOptions;

  /**
   * Set a custom `toastId`
   */
  toastId?: Id;

  /**
   * Used during update
   */
  updateId?: Id;

  /**
   * Add a delay in ms before the toast appear.
   */
  delay?: number;

  isLoading?: boolean;

  data?: Data;
}

export interface UpdateOptions<T = unknown> extends Nullable<ToastOptions<T>> {
  /**
   * Used to update a toast.
   * Pass any valid ReactNode(string, number, component)
   */
  render?: ToastContent<T>;
}

export interface ToastContainerProps extends CommonOptions {
  /**
   * Show the toast only if it includes containerId and it's the same as containerId
   * `Default: false`
   */
  enableMultiContainer?: boolean;

  /**
   * Limit the number of toast displayed at the same time
   */
  limit?: number;

  targetDocument: Document | null | undefined;

  offset?: {
    horizontal: number;
    vertical: number;
  };
}

export interface ToastTransitionProps {
  isIn: boolean;
  done: () => void;
  position: ToastPosition | string;
  preventExitTransition: boolean;
  nodeRef: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
}

/**
 * @INTERNAL
 */
export interface ToastProps extends ToastOptions {
  isIn: boolean;
  staleId?: Id;
  toastId: Id;
  key: Id;
  closeToast: () => void;
  position: ToastPosition;
  children?: ToastContent;
  deleteToast: () => void;
  type: TypeOptions;
  targetDocument: Document | null | undefined;
}

/**
 * @INTERNAL
 */
export interface NotValidatedToastProps extends Partial<ToastProps> {
  toastId: Id;
}

/**
 * @INTERNAL
 */
export interface Toast {
  content: ToastContent;
  props: ToastProps;
}

export type ToastItemStatus = 'added' | 'removed' | 'updated';

export interface ToastItem<Data = {}> {
  content: ToastContent<Data>;
  id: Id;
  type?: TypeOptions;
  isLoading?: boolean;
  containerId?: Id;
  data: Data;
  status: ToastItemStatus;
}

export interface QueuedToast {
  toastContent: ToastContent;
  toastProps: ToastProps;
  staleId?: Id;
}

export interface ContainerInstance {
  toastKey: number;
  displayedToast: number;
  props: ToastContainerProps;
  containerId?: Id | null;
  isToastActive: (toastId: Id) => boolean;
  getToast: (id: Id) => Toast | null | undefined;
  queue: QueuedToast[];
  count: number;
}
