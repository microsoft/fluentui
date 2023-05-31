import { ToastOptions } from '../types';

// TODO convert to closure
export class Toast {
  public running: boolean;
  public onUpdate: () => void;
  private toastElement?: HTMLElement;
  private pauseOnWindowBlur: ToastOptions['pauseOnWindowBlur'];
  private pauseOnHover: ToastOptions['pauseOnHover'];

  constructor() {
    this.running = false;
    this.onUpdate = () => null;

    this.pauseOnHover = false;
    this.pauseOnWindowBlur = false;
  }

  public disconnect() {
    if (!this.toastElement) {
      return;
    }

    const targetDocument = this.toastElement.ownerDocument;

    if (this.pauseOnWindowBlur) {
      targetDocument.defaultView?.removeEventListener('focus', this.play);
      targetDocument.defaultView?.removeEventListener('blur', this.pause);
    }

    if (this.pauseOnHover) {
      this.toastElement.addEventListener('mouseenter', this.pause);
      this.toastElement.addEventListener('mouseleave', this.play);
    }

    this.toastElement = undefined;
  }

  public connectToDOM(element: HTMLElement, options: Pick<ToastOptions, 'pauseOnWindowBlur' | 'pauseOnHover'>) {
    const { pauseOnHover, pauseOnWindowBlur } = options;

    this.pauseOnHover = pauseOnHover;
    this.pauseOnWindowBlur = pauseOnWindowBlur;

    this.toastElement = element;
    const targetDocument = element.ownerDocument;
    if (this.pauseOnWindowBlur) {
      targetDocument.defaultView?.addEventListener('focus', this.play);
      targetDocument.defaultView?.addEventListener('blur', this.pause);
    }

    if (this.pauseOnHover) {
      this.toastElement.addEventListener('mouseenter', this.pause);
      this.toastElement.addEventListener('mouseleave', this.play);
    }
  }

  public play = () => {
    this.running = true;
    this.onUpdate();
  };

  public pause = () => {
    this.running = false;
    this.onUpdate();
  };
}
