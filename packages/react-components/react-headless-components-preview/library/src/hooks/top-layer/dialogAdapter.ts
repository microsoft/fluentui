import { isDialogElement, isInTopLayer, isModal, isPopoverOpen, log } from './utils';
import type { DialogAdapter } from './types';

const cancelEvents = new WeakMap<HTMLElement, Event>();

const isOpenAsModal = (element: HTMLElement): boolean => isDialogElement(element) && element.open && isModal(element);

const warnModeSwitch = () => {
  if (process.env.NODE_ENV !== 'production') {
    log('warn', 'switching from `mode="modal"` to a popover mode while open applies on the next open.');
  }
};

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

  // Switching from a popover mode while open.
  if (isPopoverOpen(element)) {
    element.hidePopover();
  }

  element.showModal();
  return true;
};

/**
 * Adds `mode="modal"` to `useLayerOpenState`: `showModal()`, and dialog closes reported through `cancel` and `close`.
 */
export const dialogAdapter: DialogAdapter = {
  usesDialogEvents: (element, mode) => mode === 'modal' || isOpenAsModal(element),

  show: (element, mode) => {
    if (!isInTopLayer(element)) {
      cancelEvents.delete(element);
    }

    if (mode === 'modal') {
      return showModal(element);
    }

    if (isOpenAsModal(element)) {
      warnModeSwitch();
      return false;
    }

    return undefined;
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
