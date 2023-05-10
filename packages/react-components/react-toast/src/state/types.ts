import { EVENTS } from './constants';

export type ToastId = string;

export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';

export interface ToastOptions {
  toastId?: ToastId;
  position?: ToastPosition;
  content?: unknown;
  timeout?: number;
  pauseOnWindowBlur?: boolean;
  pauseOnHover?: boolean;
}

export interface DefaultToastOptions
  extends Pick<ToastOptions, 'position' | 'timeout' | 'pauseOnWindowBlur' | 'pauseOnHover'> {}

export interface ValidatedToastOptions extends Required<DefaultToastOptions> {}

export interface Toast extends Required<ToastOptions> {
  close: () => void;
  remove: () => void;
}

export interface DismissToastEventDetail {
  toastId: ToastId | undefined;
}

export interface ToastEventMap {
  [EVENTS.show]: CustomEvent<ToastOptions>;
  [EVENTS.dismiss]: CustomEvent<DismissToastEventDetail>;
}

export type ToastEventListenerGeneric<K extends keyof ToastEventMap> = (e: ToastEventMap[K]) => void;
export type ToastEventListener = <K extends keyof ToastEventMap>(e: ToastEventMap[K]) => void;
