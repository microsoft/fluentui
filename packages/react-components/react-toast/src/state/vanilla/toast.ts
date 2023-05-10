import { ValidatedToastOptions } from '../types';

// TODO convert to closure
export class Toast {
  public running: boolean;
  public onUpdate: () => void;
  private targetDocument: Document;
  private toastElement?: HTMLElement;
  private pauseOnWindowBlur: ValidatedToastOptions['pauseOnWindowBlur'];
  private pauseOnHover: ValidatedToastOptions['pauseOnHover'];

  constructor(targetDocument: Document, options: ValidatedToastOptions) {
    this.running = false;
    this.onUpdate = () => null;
    this.targetDocument = targetDocument;

    const { pauseOnHover, pauseOnWindowBlur } = options;
    this.pauseOnHover = pauseOnHover;
    this.pauseOnWindowBlur = pauseOnWindowBlur;

    if (this.pauseOnWindowBlur) {
      this.targetDocument.defaultView?.addEventListener('focus', this.play);
      this.targetDocument.defaultView?.addEventListener('blur', this.pause);
    }
  }

  public dispose() {
    if (this.pauseOnWindowBlur) {
      this.targetDocument.defaultView?.removeEventListener('focus', this.play);
      this.targetDocument.defaultView?.removeEventListener('blur', this.pause);
    }

    if (this.toastElement && this.pauseOnHover) {
      this.toastElement.addEventListener('mouseenter', this.pause);
      this.toastElement.addEventListener('mouseleave', this.play);
    }

    this.toastElement = undefined;
  }

  public setToastElement = (element: HTMLElement) => {
    this.toastElement = element;
    if (this.pauseOnHover) {
      this.toastElement.addEventListener('mouseenter', this.pause);
      this.toastElement.addEventListener('mouseleave', this.play);
    }
  };

  public play = () => {
    this.running = true;
    this.onUpdate();
  };

  public pause = () => {
    this.running = false;
    this.onUpdate();
  };
}
