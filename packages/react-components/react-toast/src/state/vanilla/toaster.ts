import { Toast, ToastEventMap, ToastId, ToastOptions } from '../types';
import { EVENTS } from '../constants';

// TODO convert to closure
export class Toaster {
  public visibleToasts: Set<ToastId>;
  public toasts: Map<ToastId, Toast>;
  public onUpdate: () => void;
  private targetDocument: Document;

  private listeners = new Map<keyof ToastEventMap, Function>();

  constructor(targetDocument: Document) {
    this.toasts = new Map<ToastId, Toast>();
    this.visibleToasts = new Set<ToastId>();
    this.onUpdate = () => null;
    this.targetDocument = targetDocument;

    this._initEvents();
  }

  public dispose() {
    for (const [event, callback] of this.listeners.entries()) {
      this._removeEventListener(event, callback as () => void);
    }
  }

  public isToastVisible(toastId: ToastId) {
    return this.visibleToasts.has(toastId);
  }

  private _initEvents() {
    const buildToast: (e: ToastEventMap[typeof EVENTS.show]) => void = e => this._buildToast(e.detail);

    this.listeners.set(EVENTS.show, buildToast);

    this._addEventListener(EVENTS.show, buildToast);
  }

  private _addEventListener<TEvent extends keyof ToastEventMap>(
    eventType: TEvent,
    callback: (event: ToastEventMap[TEvent]) => void,
  ) {
    this.targetDocument.addEventListener(eventType, callback as () => void);
  }

  private _removeEventListener(eventType: keyof ToastEventMap, callback: () => void) {
    this.targetDocument.removeEventListener(eventType, callback);
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
