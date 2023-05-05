import * as React from 'react';
import {
  Id,
  ToastContent,
  ClearWaitingQueueParams,
  NotValidatedToastProps,
  ToastItem,
  ContainerInstance,
} from './types';

export const enum Event {
  Show,
  Clear,
  DidMount,
  WillUnmount,
  Change,
  ClearWaitingQueue,
}

type OnShowCallback = (content: ToastContent, options: NotValidatedToastProps) => void;
type OnClearCallback = (id?: Id) => void;
type OnClearWaitingQueue = (params: ClearWaitingQueueParams) => void;
type OnDidMountCallback = (containerInstance: ContainerInstance) => void;
type OnWillUnmountCallback = OnDidMountCallback;

export type OnChangeCallback = (toast: ToastItem) => void;

type Callback =
  | OnShowCallback
  | OnClearCallback
  | OnClearWaitingQueue
  | OnDidMountCallback
  | OnWillUnmountCallback
  | OnChangeCallback;
type TimeoutId = ReturnType<typeof setTimeout>;

export interface EventManager {
  list: Map<Event, Callback[]>;
  emitQueue: Map<Event, TimeoutId[]>;
  on(event: Event.Show, callback: OnShowCallback): EventManager;
  on(event: Event.Clear, callback: OnClearCallback): EventManager;
  on(event: Event.ClearWaitingQueue, callback: OnClearWaitingQueue): EventManager;
  on(event: Event.DidMount, callback: OnDidMountCallback): EventManager;
  on(event: Event.WillUnmount, callback: OnWillUnmountCallback): EventManager;
  on(event: Event.Change, callback: OnChangeCallback): EventManager;
  off(event: Event, callback?: Callback): EventManager;
  cancelEmit(event: Event): EventManager;
  emit<TData>(event: Event.Show, content: React.ReactNode | ToastContent<TData>, options: NotValidatedToastProps): void;
  emit(event: Event.Clear, id?: string | number): void;
  emit(event: Event.ClearWaitingQueue, params: ClearWaitingQueueParams): void;
  emit(event: Event.DidMount, containerInstance: ContainerInstance): void;
  emit(event: Event.WillUnmount, containerInstance: ContainerInstance): void;
  emit(event: Event.Change, data: ToastItem): void;
}

export const eventManager: EventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on(event: Event, callback: Callback) {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event)!.push(callback);
    return this;
  },

  off(event, callback) {
    if (callback) {
      const remainingCallbacks = this.list.get(event)?.filter(cb => cb !== callback) ?? [];
      this.list.set(event, remainingCallbacks);
      return this;
    }
    this.list.delete(event);
    return this;
  },

  cancelEmit(event) {
    const timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach(clearTimeout);
      this.emitQueue.delete(event);
    }

    return this;
  },

  /**
   * Enqueue the event at the end of the call stack
   * Doing so let the user call toast as follow:
   * toast('1')
   * toast('2')
   * toast('3')
   * Without setTimemout the code above will not work
   */
  emit(event: Event, ...args: unknown[]) {
    this.list.has(event) &&
      this.list.get(event)?.forEach((callback: Callback) => {
        const timer: TimeoutId = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          callback(...args);
        }, 0);

        this.emitQueue.has(event) || this.emitQueue.set(event, []);
        this.emitQueue.get(event)!.push(timer);
      });
  },
};
