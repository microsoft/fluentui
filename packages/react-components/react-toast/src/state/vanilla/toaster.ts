import { Toast, ToastEventListener, ToastEventListenerGeneric, ToastEventMap, ToastId, ToastOptions } from '../types';
import { EVENTS } from '../constants';

// TODO convert to closure
export class Toaster {
  public visibleToasts: Set<ToastId>;
  public toasts: Map<ToastId, Toast>;
  public onUpdate: () => void;
  private targetDocument: Document;

  private listeners = new Map<keyof ToastEventMap, ToastEventListener>();

  constructor(targetDocument: Document) {
    this.toasts = new Map<ToastId, Toast>();
    this.visibleToasts = new Set<ToastId>();
    this.onUpdate = () => null;
    this.targetDocument = targetDocument;

    this._initEvents();
  }

  public dispose() {
    this.toasts.clear();
    for (const [event, callback] of this.listeners.entries()) {
      this._removeEventListener(event, callback);
      this.listeners.delete(event);
    }
  }

  public isToastVisible(toastId: ToastId) {
    return this.visibleToasts.has(toastId);
  }

  private _initEvents() {
    const buildToast: ToastEventListener = e => this._buildToast(e.detail);

    this.listeners.set(EVENTS.show, buildToast);

    this._addEventListener(EVENTS.show, buildToast);
  }

  private _addEventListener<TEvent extends keyof ToastEventMap>(
    eventType: TEvent,
    callback: ToastEventListenerGeneric<TEvent>,
  ) {
    this.targetDocument.addEventListener(eventType, callback as () => void);
  }

  private _removeEventListener<TEvent extends keyof ToastEventMap>(
    eventType: keyof ToastEventMap,
    callback: ToastEventListenerGeneric<TEvent>,
  ) {
    this.targetDocument.removeEventListener(eventType, callback as () => void);
  }

  private _buildToast(toastOptions: ToastOptions) {
    const { toastId = '', position = 'bottom-right', timeout = 3000, content = '' } = toastOptions;
    if (this.toasts.has(toastId)) {
      return;
    }

    const close = () => {
      this.visibleToasts.delete(toastId);
      this.onUpdate();
    };

    const remove = () => {
      this.toasts.delete(toastId);
      this.onUpdate();
    };

    const toast: Toast = {
      position,
      toastId,
      timeout,
      content,
      close,
      remove,
    };

    this.visibleToasts.add(toastId);
    this.toasts.set(toastId, toast);
    this.onUpdate();
  }
}
