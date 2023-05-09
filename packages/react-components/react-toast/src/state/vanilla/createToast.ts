import * as React from 'react';
import { ToastOptions } from '../types';
import { EVENTS } from '../constants';

let counter = 0;

export function createToast(content: React.ReactNode, options: ToastOptions = {}, targetDocument: Document) {
  if (!options.toastId) {
    options.toastId = (counter++).toString();
  }
  const event = new CustomEvent(EVENTS.show, { bubbles: false, cancelable: false, detail: { ...options, content } });
  targetDocument.dispatchEvent(event);
}
