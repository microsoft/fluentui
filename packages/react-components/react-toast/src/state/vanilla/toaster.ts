import {
  Toast,
  ToasterOptions,
  ToastId,
  ToastOptions,
  ToastListenerMap,
  UpdateToastEventDetail,
  ToasterId,
  ShowToastEventDetail,
  CommonToastDetail,
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
  private toasterElement?: HTMLElement;
  private toasterOptions: ToasterOptions;
  private toasterId?: ToastId;

  private listeners = new Map<keyof ToastListenerMap, ToastListenerMap[keyof ToastListenerMap]>();

  constructor(toasterId?: ToasterId) {
    this.toasterId = toasterId;
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
    if (!this.toasterElement) {
      return;
    }

    const listener: ToastListenerMap[TType] = (e: CustomEvent<CommonToastDetail>) => {
      if (e.detail.toasterId !== this.toasterId) {
        return;
      }

      callback(e as CustomEvent<ShowToastEventDetail>);
    };

    this.listeners.set(eventType, listener);
    const targetDocument = this.toasterElement?.ownerDocument;
    targetDocument.addEventListener(eventType, listener as () => void);
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
    const { toastId, content, toasterId } = toastOptions;

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
      toasterId,
    };

    assignDefined<Toast>(toast, toastOptions);

    this.visibleToasts.add(toastId);
    this.toasts.set(toastId, toast);
    this.onUpdate();
  }
}
