import {
  DefaultToastOptions,
  Toast,
  ToastEventListener,
  ToastEventListenerGeneric,
  ToastEventMap,
  ToastId,
  ToastOptions,
  ValidatedToastOptions,
} from '../types';
import { EVENTS } from '../constants';

// TODO convert to closure
export class Toaster {
  public visibleToasts: Set<ToastId>;
  public toasts: Map<ToastId, Toast>;
  public onUpdate: () => void;
  private toasterElement?: HTMLElement;
  private defaultToastOptions: ValidatedToastOptions;

  private listeners = new Map<keyof ToastEventMap, ToastEventListener>();

  constructor() {
    this.toasts = new Map<ToastId, Toast>();
    this.visibleToasts = new Set<ToastId>();
    this.onUpdate = () => null;
    this.defaultToastOptions = {
      pauseOnHover: false,
      pauseOnWindowBlur: false,
      position: 'bottom-right',
      timeout: 3000,
    };
  }

  public disconnect() {
    this.toasts.clear();

    for (const [event, callback] of this.listeners.entries()) {
      this._removeEventListener(event, callback);
      this.listeners.delete(event);
    }

    this.toasterElement = undefined;
  }

  public connectToDOM(toasterElement: HTMLElement, options: DefaultToastOptions) {
    this.toasterElement = toasterElement;
    this.defaultToastOptions = {
      ...this.defaultToastOptions,
      ...options,
    };

    const buildToast: ToastEventListener = e => this._buildToast(e.detail);
    const dismissToast: ToastEventListener = e => {
      const { toastId } = e.detail;
      if (toastId) {
        this._dismissToast(toastId);
      } else {
        this._dismissAllToasts();
      }
    };

    this.listeners.set(EVENTS.show, buildToast);
    this.listeners.set(EVENTS.dismiss, dismissToast);

    this._addEventListener(EVENTS.show, buildToast);
    this._addEventListener(EVENTS.dismiss, dismissToast);
  }

  public isToastVisible = (toastId: ToastId) => {
    return this.visibleToasts.has(toastId);
  };

  private _addEventListener<TEvent extends keyof ToastEventMap>(
    eventType: TEvent,
    callback: ToastEventListenerGeneric<TEvent>,
  ) {
    if (!this.toasterElement) {
      return;
    }

    const targetDocument = this.toasterElement?.ownerDocument;
    targetDocument.addEventListener(eventType, callback as () => void);
  }

  private _removeEventListener<TEvent extends keyof ToastEventMap>(
    eventType: keyof ToastEventMap,
    callback: ToastEventListenerGeneric<TEvent>,
  ) {
    if (!this.toasterElement) {
      return;
    }

    const targetDocument = this.toasterElement?.ownerDocument;
    targetDocument.removeEventListener(eventType, callback as () => void);
  }

  private _dismissToast(toastId: ToastId) {
    this.visibleToasts.delete(toastId);
    this.onUpdate();
  }

  private _dismissAllToasts() {
    this.visibleToasts.clear();
    this.onUpdate();
  }

  private _validateToastOptions(toastOptions: ToastOptions) {
    const validatedToastOptions: ValidatedToastOptions = { ...this.defaultToastOptions };
    for (const [key, prop] of Object.entries(toastOptions)) {
      if (toastOptions.hasOwnProperty(key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        validatedToastOptions[key] = prop;
      }
    }

    return validatedToastOptions;
  }

  private _buildToast(toastOptions: ToastOptions) {
    const validatedToastOptions = this._validateToastOptions(toastOptions);
    const { toastId, content } = toastOptions;

    if (!content || !toastId || this.toasts.has(toastId)) {
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
      ...validatedToastOptions,
      toastId,
      content,
      close,
      remove,
    };

    this.visibleToasts.add(toastId);
    this.toasts.set(toastId, toast);
    this.onUpdate();
  }
}
