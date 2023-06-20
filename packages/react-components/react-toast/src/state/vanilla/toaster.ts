// The underlying implementation of priority queue is vanilla js
import { createPriorityQueue, PriorityQueue } from '@fluentui/react-utilities';
import {
  Toast,
  ToasterOptions,
  ToastId,
  ToastOptions,
  ToastListenerMap,
  UpdateToastEventDetail,
  ShowToastEventDetail,
  CommonToastDetail,
  ToasterId,
} from '../types';
import { EVENTS } from '../constants';

function assignDefined<T extends object>(a: Partial<T>, b: Partial<T>) {
  // This cast is required, as Object.entries will return string as key which is not indexable
  for (const [key, prop] of Object.entries(b) as [keyof T, T[keyof T]][]) {
    // eslint-disable-next-line eqeqeq
    if (prop != undefined) {
      a[key] = prop;
    }
  }
}

// TODO convert to closure
export class Toaster {
  public visibleToasts: Set<ToastId>;
  public toasts: Map<ToastId, Toast>;
  public onUpdate: () => void;
  private targetDocument?: Document;
  private toastOptions: Pick<
    ToastOptions,
    'priority' | 'pauseOnHover' | 'pauseOnWindowBlur' | 'position' | 'timeout' | 'politeness' | 'onStatusChange'
  >;
  private toasterId?: ToasterId;
  private queue: PriorityQueue<ToastId>;
  private limit: number;

  private listeners = new Map<keyof ToastListenerMap, ToastListenerMap[keyof ToastListenerMap]>();

  constructor() {
    this.toasts = new Map<ToastId, Toast>();
    this.visibleToasts = new Set<ToastId>();
    this.onUpdate = () => null;
    this.toastOptions = {
      onStatusChange: undefined,
      priority: 0,
      pauseOnHover: false,
      pauseOnWindowBlur: false,
      position: 'bottom-end',
      timeout: 3000,
    };
    this.queue = createPriorityQueue<ToastId>((ta, tb) => {
      const a = this.toasts.get(ta);
      const b = this.toasts.get(tb);
      if (!a || !b) {
        return 0;
      }

      if (a.priority === b.priority) {
        return a.dispatchedAt - b.dispatchedAt;
      }

      return a.priority - b.priority;
    });
    this.limit = Number.POSITIVE_INFINITY;
  }

  public disconnect() {
    this.toasts.clear();
    this.queue.clear();

    for (const [event, callback] of this.listeners.entries()) {
      this._removeEventListener(event, callback);
      this.listeners.delete(event);
    }

    this.targetDocument = undefined;
  }

  public connectToDOM(targetDocument: Document, options: Partial<ToasterOptions>) {
    const { limit = Number.POSITIVE_INFINITY, toasterId, ...rest } = options;
    this.targetDocument = targetDocument;
    this.limit = limit;
    this.toasterId = toasterId;
    assignDefined(this.toastOptions, rest);

    const buildToast: ToastListenerMap[typeof EVENTS.show] = e => this._buildToast(e.detail);
    const updateToast: ToastListenerMap[typeof EVENTS.update] = e => this._updateToast(e.detail);
    const dismissToast: ToastListenerMap[typeof EVENTS.dismiss] = e => this._dismissToast(e.detail.toastId);
    const dismissAllToasts: ToastListenerMap[typeof EVENTS.dismissAll] = e => this._dismissAllToasts();

    this._addEventListener(EVENTS.show, buildToast);
    this._addEventListener(EVENTS.dismiss, dismissToast);
    this._addEventListener(EVENTS.dismissAll, dismissAllToasts);
    this._addEventListener(EVENTS.update, updateToast);
  }

  public isToastVisible = (toastId: ToastId) => {
    return this.visibleToasts.has(toastId);
  };

  private _addEventListener<TType extends keyof ToastListenerMap>(eventType: TType, callback: ToastListenerMap[TType]) {
    if (!this.targetDocument) {
      return;
    }

    const listener: ToastListenerMap[TType] = (e: CustomEvent<CommonToastDetail>) => {
      if (e.detail.toasterId !== this.toasterId) {
        return;
      }

      callback(e as CustomEvent<ShowToastEventDetail>);
    };

    this.listeners.set(eventType, listener);
    this.targetDocument.addEventListener(eventType, listener as () => void);
  }

  private _removeEventListener<TType extends keyof ToastListenerMap>(
    eventType: TType,
    callback: ToastListenerMap[TType],
  ) {
    if (!this.targetDocument) {
      return;
    }

    this.targetDocument.removeEventListener(eventType, callback as () => void);
  }

  private _updateToast(toastOptions: UpdateToastEventDetail) {
    const { toastId } = toastOptions;
    const toastToUpdate = this.toasts.get(toastId);
    if (!toastToUpdate) {
      return;
    }

    Object.assign(toastToUpdate, toastOptions);
    toastToUpdate.updateId++;
    this.onUpdate();
  }

  private _dismissToast(toastId: ToastId) {
    this.visibleToasts.delete(toastId);
    this.onUpdate();
  }

  private _dismissAllToasts() {
    this.visibleToasts.clear();
    this.queue.clear();
    this.onUpdate();
  }

  private _buildToast(toastOptions: Partial<ToastOptions> & { toastId: ToastId }) {
    const { toastId, content, toasterId } = toastOptions;

    if (this.toasts.has(toastId)) {
      return;
    }

    const close = () => {
      const toast = this.toasts.get(toastId);
      if (!toast) {
        return;
      }

      this.visibleToasts.delete(toastId);
      this.onUpdate();
      toast.onStatusChange?.(null, { status: 'dismissed', ...toast });
    };

    const remove = () => {
      const toast = this.toasts.get(toastId);
      if (!toast) {
        return;
      }

      toast.onStatusChange?.(null, { status: 'unmounted', ...toast });
      this.toasts.delete(toastId);

      if (this.visibleToasts.size < this.limit && this.queue.peek()) {
        const nextToast = this.toasts.get(this.queue.dequeue());
        if (!nextToast) {
          return;
        }

        this.visibleToasts.add(nextToast.toastId);
        toast.onStatusChange?.(null, { status: 'visible', ...nextToast });
      }
      this.onUpdate();
    };

    const toast: Toast = {
      ...this.toastOptions,
      close,
      remove,
      toastId,
      content,
      updateId: 0,
      toasterId,
      dispatchedAt: Date.now(),
      data: {},
    };

    assignDefined<Toast>(toast, toastOptions);

    this.toasts.set(toastId, toast);
    toast.onStatusChange?.(null, { status: 'queued', ...toast });
    if (this.visibleToasts.size >= this.limit) {
      this.queue.enqueue(toastId);
    } else {
      this.visibleToasts.add(toastId);
      this.onUpdate();
      toast.onStatusChange?.(null, { status: 'visible', ...toast });
    }
  }
}
