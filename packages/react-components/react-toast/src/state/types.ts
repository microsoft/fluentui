import type { Slot } from '@fluentui/react-utilities';
import { EVENTS } from './constants';
import * as React from 'react';

export type ToastId = string;
export type ToasterId = string;

export type ToastPosition = 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start' | 'top' | 'bottom';
export type ToastPoliteness = 'assertive' | 'polite';
export type ToastStatus = 'queued' | 'visible' | 'dismissed' | 'unmounted';
export type ToastIntent = 'info' | 'success' | 'error' | 'warning';
export type ToastChangeHandler = (event: null, data: ToastChangeData) => void;

export interface ToastChangeData extends ToastOptions, Pick<Toast, 'updateId'> {
  status: ToastStatus;
}

export interface ToastOptions<TData = object> {
  /**
   * Uniquely identifies a toast, used for update and dismiss operations
   */
  toastId: ToastId;
  /**
   * The position the toast should render to
   */
  position: ToastPosition;
  /**
   * Toast content
   */
  content: unknown;
  /**
   * Auto dismiss timeout in milliseconds
   * @default 3000
   */
  timeout: number;
  /**
   * Toast timeout pauses while focus is on another window
   * @default false
   */
  pauseOnWindowBlur: boolean;
  /**
   * Toast timeout pauses while user cursor is on the toast
   * @default false
   */
  pauseOnHover: boolean;
  /**
   * Toast belongs to a specific toaster
   */
  toasterId: ToasterId | undefined;
  /**
   * Higher priority toasts will be rendered before lower priority toasts
   */
  priority: number;
  /**
   * Used to determine [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) narration
   * This will override the intent prop
   */
  politeness?: ToastPoliteness;

  /**
   * Default toast types that determine the urgency or [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) narration
   * The UI layer may use these intents to apply specific styling.
   * @default info
   */
  intent?: ToastIntent;
  /**
   * Additional data that needs to be passed to the toast
   */
  data: TData;

  /**
   * Reports changes to the Toast lifecycle
   */
  onStatusChange: ToastChangeHandler | undefined;
}

export interface ToastOffsetObject {
  horizontal?: number;
  vertical?: number;
}

export type ToastOffset = Partial<Record<ToastPosition, ToastOffsetObject>> | ToastOffsetObject;

export interface ToasterShortcuts {
  focus: (e: KeyboardEvent) => boolean;
}

export interface ToasterOptions
  extends Pick<ToastOptions, 'position' | 'timeout' | 'pauseOnWindowBlur' | 'pauseOnHover' | 'priority'> {
  offset?: ToastOffset;
  toasterId?: ToasterId;
  limit?: number;
  shortcuts?: ToasterShortcuts;
}

export interface Toast<TData = object> extends ToastOptions<TData> {
  /**
   * Determines the visiblity of a toast
   */
  close: () => void;
  /**
   * Removes a toast completely
   */
  remove: () => void;
  /**
   * A number used to track updates immutably
   */
  updateId: number;
  /**
   * Used to determine default priority when the user does not set one
   * Simple counter of toasts dispatched.
   */
  order: number;

  imperativeRef: React.RefObject<ToastImperativeRef>;
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

export interface PauseToastEventDetail extends CommonToastDetail {
  toastId: ToastId;
}

export interface PlayToastEventDetail extends CommonToastDetail {
  toastId: ToastId;
}

export interface DismissAllToastsEventDetail extends CommonToastDetail {}

type EventListener<TDetail> = (e: CustomEvent<TDetail>) => void;

export type ToastListenerMap = {
  [EVENTS.show]: EventListener<ShowToastEventDetail>;
  [EVENTS.dismiss]: EventListener<DismissToastEventDetail>;
  [EVENTS.dismissAll]: EventListener<DismissAllToastsEventDetail>;
  [EVENTS.update]: EventListener<UpdateToastEventDetail>;
  [EVENTS.play]: EventListener<PlayToastEventDetail>;
  [EVENTS.pause]: EventListener<PauseToastEventDetail>;
};

type RootSlot = Slot<'div'>;

export interface DispatchToastOptions extends Partial<Omit<ToastOptions, 'toasterId'>> {
  root?: RootSlot;
}

export interface UpdateToastOptions extends UpdateToastEventDetail {
  root?: RootSlot;
}

export type ToastImperativeRef = {
  /**
   * Focuses the Toast.
   * If there are no focusable elements in the Toast, the Toast itself is focused.
   */
  focus: () => void;

  /**
   * Resumes the timeout of a paused toast
   */
  play: () => void;

  /**
   * Pauses the timeout of a toast
   */
  pause: () => void;
};
