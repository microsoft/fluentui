import { Toast, ToasterOptions, ToastId, ToastOptions, ToastListenerMap, UpdateToastEventDetail } from '../types';
import { EVENTS } from '../constants';

function assignDefined<T extends object>(a: Partial<T>, b: Partial<T>) {
  for (const [key, prop] of Object.entries(b)) {
    if (prop !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      a[key] = prop;
    }
  }
}

// TODO convert to closure
export class Toaster {
  public visibleToasts: Set<ToastId>;
  public toasts: Map<ToastId, Toast>;
  public onUpdate: () => void;
  private toasterElement?: HTMLElement;
  private toasterOptions: ToasterOptions;

  private listeners = new Map<keyof ToastListenerMap, ToastListenerMap[keyof ToastListenerMap]>();

  constructor() {
    this.toasts = new Map<ToastId, Toast>();
    this.visibleToasts = new Set<ToastId>();
    this.onUpdate = () => null;
    this.toasterOptions = {
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

  public connectToDOM(toasterElement: HTMLElement, options: Partial<ToasterOptions>) {
    this.toasterElement = toasterElement;
    assignDefined(this.toasterOptions, options);

    const buildToast: ToastListenerMap[typeof EVENTS.show] = e => this._buildToast(e.detail);
    const updateToast: ToastListenerMap[typeof EVENTS.update] = e => this._updateToast(e.detail);
    const dismissToast: ToastListenerMap[typeof EVENTS.dismiss] = e => {
      const { toastId } = e.detail;
      if (toastId) {
        this._dismissToast(toastId);
      } else {
        this._dismissAllToasts();
      }
    };

    this._addEventListener(EVENTS.show, buildToast);
    this._addEventListener(EVENTS.dismiss, dismissToast);
    this._addEventListener(EVENTS.update, updateToast);
  }

  public isToastVisible = (toastId: ToastId) => {
    return this.visibleToasts.has(toastId);
  };

  private _addEventListener<TType extends keyof ToastListenerMap>(eventType: TType, callback: ToastListenerMap[TType]) {
    if (!this.toasterElement) {
      return;
    }

    this.listeners.set(eventType, callback);
    const targetDocument = this.toasterElement?.ownerDocument;
    targetDocument.addEventListener(eventType, callback as () => void);
  }

  private _removeEventListener<TType extends keyof ToastListenerMap>(
    eventType: TType,
    callback: ToastListenerMap[TType],
  ) {
    if (!this.toasterElement) {
      return;
    }

    const targetDocument = this.toasterElement?.ownerDocument;
    targetDocument.removeEventListener(eventType, callback as () => void);
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
    this.onUpdate();
  }

  private _buildToast(toastOptions: Partial<ToastOptions> & { toastId: ToastId }) {
    const { toastId, content } = toastOptions;

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
      ...this.toasterOptions,
      close,
      remove,
      toastId,
      content,
      updateId: 0,
    };

    assignDefined<Toast>(toast, toastOptions);

    this.visibleToasts.add(toastId);
    this.toasts.set(toastId, toast);
    this.onUpdate();
  }
}
