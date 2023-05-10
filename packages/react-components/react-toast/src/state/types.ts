import { EVENTS } from './constants';

export type ToastId = string;

export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';

export interface ToastOptions {
  toastId?: ToastId;
  position?: ToastPosition;
  content?: unknown;
  timeout?: number;
}

export interface Toast extends Required<Omit<ToastOptions, 'toasterId'>> {
  close: () => void;
  remove: () => void;
}

export interface ToastEventMap {
  [EVENTS.show]: CustomEvent<ToastOptions>;
}

export type ToastEventListenerGeneric<K extends keyof ToastEventMap> = (e: ToastEventMap[K]) => void;
export type ToastShowEventListener = ToastEventListenerGeneric<typeof EVENTS.show>;
export type ToastEventListener = ToastShowEventListener;
