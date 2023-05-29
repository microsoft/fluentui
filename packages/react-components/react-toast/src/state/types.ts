import { EVENTS } from './constants';

export type ToastId = string;
export type ToasterId = string;

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastOptions {
  toastId: ToastId;
  position: ToastPosition;
  content: unknown;
  timeout: number;
  pauseOnWindowBlur: boolean;
  pauseOnHover: boolean;
  toasterId: ToasterId | undefined;
  priority: number;
  politeness: 'assertive' | 'polite';
}

export interface ToastOffsetObject {
  horizontal?: number;
  vertical?: number;
}

export type ToastOffset = Partial<Record<ToastPosition, ToastOffsetObject>> | ToastOffsetObject;

export interface ToasterOptions
  extends Pick<ToastOptions, 'position' | 'timeout' | 'pauseOnWindowBlur' | 'pauseOnHover' | 'priority'> {
  offset?: ToastOffset;
  toasterId?: ToasterId;
  limit?: number;
}

export interface Toast extends ToastOptions {
  close: () => void;
  remove: () => void;
  updateId: number;
  dispatchedAt: number;
}

export interface CommonToastDetail {
  toasterId?: ToasterId;
}

export interface ShowToastEventDetail extends Partial<ToastOptions>, CommonToastDetail {
  toastId: ToastId;
}

export interface UpdateToastEventDetail extends Partial<ToastOptions>, CommonToastDetail {
  toastId: ToastId;
}

export interface DismissToastEventDetail extends CommonToastDetail {
  toastId: ToastId;
}

export interface DismissAllToastsEventDetail extends CommonToastDetail {}

type EventListener<TDetail> = (e: CustomEvent<TDetail>) => void;

export type ToastListenerMap = {
  [EVENTS.show]: EventListener<ShowToastEventDetail>;
  [EVENTS.dismiss]: EventListener<DismissToastEventDetail>;
  [EVENTS.dismissAll]: EventListener<DismissAllToastsEventDetail>;
  [EVENTS.update]: EventListener<UpdateToastEventDetail>;
};
