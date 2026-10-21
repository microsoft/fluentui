import { isDialogElement, isInTopLayer, isModal, isPopoverOpen, log } from './utils';
import type { DialogAdapter, PopoverMode } from './types';

const cancelEvents = new WeakMap<HTMLElement, Event>();

const showModal = (element: HTMLElement): boolean => {
  if (!isDialogElement(element)) {
    if (process.env.NODE_ENV !== 'production') {
      log('error', '`mode="modal"` requires a <dialog> element.');
    }

    return false;
  }

  if (element.open && isModal(element)) {
    return false;
  }

  if (isPopoverOpen(element)) {
    element.hidePopover();
  } else if (element.open) {
    element.close();
  }

  element.showModal();
  return true;
};

const showNonModal = (element: HTMLDialogElement, mode: PopoverMode): boolean | undefined => {
  if (typeof element.showPopover !== 'function') {
    if (element.open && !isModal(element)) {
      return false;
    }

    if (element.open) {
      element.close();
    }

    element.show();
    return true;
  }

  // Switching from `modal` while open. The `popover` attribute can land a render after `mode`, so set it here.
  if (element.open && !isPopoverOpen(element)) {
    element.close();
    if (!element.hasAttribute('popover')) {
      element.setAttribute('popover', mode);
    }
  }

  return undefined;
};

/**
 * Adds `mode="modal"` and `<dialog>` support to `useLayerOpenState`: `showModal()`, the `show()` fallback without the
 * Popover API, and dialog closes reported through `cancel` and `close`.
 */
export const dialogAdapter: DialogAdapter = {
  usesDialogEvents: (element, mode) =>
    mode === 'modal' || (isDialogElement(element) && typeof element.showPopover !== 'function'),

  show: (element, mode) => {
    if (!isInTopLayer(element)) {
      cancelEvents.delete(element);
    }

    if (mode === 'modal') {
      return showModal(element);
    }

    return isDialogElement(element) ? showNonModal(element, mode) : undefined;
  },

  hide: element => {
    if (isDialogElement(element) && element.open) {
      element.close();
    }
  },

  handleEvent: (event, onClose) => {
    const element = event.currentTarget as HTMLElement;
    if (event.target !== element) {
      return;
    }

    if (event.type === 'cancel') {
      cancelEvents.set(element, event);
      return;
    }

    if (isDialogElement(element) && element.open) {
      return;
    }

    const cancel = cancelEvents.get(element);
    cancelEvents.delete(element);
    onClose(cancel && !cancel.defaultPrevented ? 'escape' : 'native-close');
  },
};
