import { isDialogElement, isModal, isPopoverOpen } from '../../utils/topLayer';
import type { TopLayerMode } from './TopLayer.types';
import type { UseTopLayerOptions } from './useTopLayer.types';

export const log = (level: 'warn' | 'error', message: string): void => {
  // eslint-disable-next-line no-console
  console[level](`@fluentui/react-headless-components-preview [useTopLayer]: ${message}`);
};

/**
 * Shows a `<dialog>` with `showModal()`. Returns whether this call showed it; false when it was already modal.
 */
export const showModal = (element: HTMLElement): boolean => {
  if (!isDialogElement(element)) {
    if (process.env.NODE_ENV !== 'production') {
      log('error', '`mode="modal"` requires a <dialog> element.');
    }

    return false;
  }

  if (element.open && isModal(element)) {
    return false;
  }

  // Switching from a popover mode, or from `show()` without the Popover API, while open.
  if (isPopoverOpen(element)) {
    element.hidePopover();
  } else if (element.open) {
    element.close();
  }
  element.showModal();
  return true;
};

/**
 * Shows the element as a popover, or a `<dialog>` with `show()` without the Popover API. Returns whether this call
 * showed it; false when it was already shown or could not be.
 */
export const showPopover = (element: HTMLElement, mode: Exclude<TopLayerMode, 'modal'>): boolean => {
  if (isPopoverOpen(element)) {
    return false;
  }

  if (typeof element.showPopover !== 'function') {
    if (!isDialogElement(element)) {
      if (process.env.NODE_ENV !== 'production') {
        log(
          'warn',
          'the Popover API is not supported in this browser. Include a popover polyfill for better browser support.',
        );
      }

      return false;
    }

    if (element.open && !isModal(element)) {
      return false;
    }

    // Switching from `modal` while open.
    if (element.open) {
      element.close();
    }
    element.show();
    return true;
  }

  // Switching from `modal` while open. The `popover` attribute can land a render after `mode`, so set it here.
  if (isDialogElement(element) && element.open) {
    element.close();
    if (!element.hasAttribute('popover')) {
      element.setAttribute('popover', mode);
    }
  }

  try {
    element.showPopover();
    return true;
  } catch {
    return false;
  }
};

export const hide = (element: HTMLElement): void => {
  if (typeof element.hidePopover === 'function' && isPopoverOpen(element)) {
    element.hidePopover();
  } else if (isDialogElement(element) && element.open) {
    element.close();
  }
};

/**
 * Whether the element reports closes through the dialog `cancel` and `close` events: a modal `<dialog>`, or a
 * `<dialog>` shown with `show()` without the Popover API.
 */
export const usesDialogEvents = (element: HTMLElement, modal: boolean): boolean =>
  modal || (isDialogElement(element) && typeof element.showPopover !== 'function');

export const getInitialFocusTarget = (
  element: HTMLElement,
  initialFocus: UseTopLayerOptions['initialFocus'],
): HTMLElement | null | false => {
  if (!initialFocus) {
    return null;
  }
  return typeof initialFocus === 'function' ? initialFocus(element) : initialFocus.current;
};

const INERT_ATTRIBUTES = { inert: '', 'aria-hidden': 'true' };

// Values the attributes had before the hook set them, so the consumer's own values come back after the exit.
const savedAttributes = new WeakMap<HTMLElement, Record<string, string | null>>();

export const setInert = (element: HTMLElement, inert: boolean): void => {
  const saved = savedAttributes.get(element);
  if (inert) {
    if (!saved) {
      savedAttributes.set(element, {
        inert: element.getAttribute('inert'),
        'aria-hidden': element.getAttribute('aria-hidden'),
      });
      Object.entries(INERT_ATTRIBUTES).forEach(([name, value]) => element.setAttribute(name, value));
    }
    return;
  }

  savedAttributes.delete(element);
  Object.entries(INERT_ATTRIBUTES).forEach(([name, value]) => {
    const previous = saved?.[name];
    // Skip attributes React changed during the exit, e.g. `aria-hidden={!open}` on reopen.
    if (previous === undefined || element.getAttribute(name) !== value) {
      return;
    }
    if (previous === null) {
      element.removeAttribute(name);
    } else {
      element.setAttribute(name, previous);
    }
  });
};
