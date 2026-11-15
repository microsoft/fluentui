'use client';

import * as React from 'react';
import { Tab } from '@fluentui/keyboard-keys';
import { isHTMLElement } from '@fluentui/react-utilities';
import { isDialogElement, isModal } from './utils';
import { FOCUSABLE_CANDIDATE_SELECTOR, getTabIndex } from '../../utils/focusable';

const isTabStop = (element: HTMLElement, checkedRadios: HTMLInputElement[]): boolean =>
  getTabIndex(element) >= 0 &&
  !element.matches(':disabled') &&
  !element.closest('[inert]') &&
  // Only the checked radio of a group is a tab stop.
  !(
    isHTMLElement(element, { constructorName: 'HTMLInputElement' }) &&
    element.type === 'radio' &&
    !element.checked &&
    checkedRadios.some(radio => radio.name === element.name && radio.form === element.form)
  ) &&
  (element.checkVisibility?.({ visibilityProperty: true }) ?? true);

/**
 * The dialog's tab stops in tab order: positive `tabindex` first, then document order.
 */
export const getDialogTabStops = (dialog: HTMLDialogElement): HTMLElement[] => {
  const checkedRadios = Array.from(
    dialog.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked:not([name=""])[name]'),
  );
  const order = (element: HTMLElement) => getTabIndex(element) || Number.MAX_SAFE_INTEGER;
  return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_CANDIDATE_SELECTOR))
    .filter(element => isTabStop(element, checkedRadios))
    .sort((a, b) => order(a) - order(b));
};

const createSentinel = (targetDocument: Document, tabIndex: number): HTMLElement => {
  const sentinel = targetDocument.createElement('span');
  sentinel.tabIndex = tabIndex;
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:fixed;width:1px;height:1px;clip-path:inset(50%);pointer-events:none';
  return sentinel;
};

/**
 * Keeps Tab inside a modal `<dialog>` in a frame, where `showModal()` leaves the host page interactive. Focusable
 * sentinels at both ends wrap focus in the browser's own tab order. Returns a cleanup function.
 */
export const trapTabInFrame = (dialog: HTMLDialogElement): (() => void) => {
  const targetDocument = dialog.ownerDocument;
  // `tabindex="1"` comes before any positive tabindex; everything outside the dialog is inert.
  const start = createSentinel(targetDocument, 1);
  const end = createSentinel(targetDocument, 0);

  const place = () => {
    if (dialog.firstChild !== start) {
      dialog.insertBefore(start, dialog.firstChild);
    }
    if (dialog.lastChild !== end) {
      dialog.appendChild(end);
    }
  };

  const focusEdge = (last: boolean) => {
    const tabStops = getDialogTabStops(dialog).filter(element => element !== start && element !== end);
    (tabStops[last ? tabStops.length - 1 : 0] ?? dialog).focus();
  };

  // Focus from inside wraps to the other end; from outside or the surface it goes to the near end.
  const handleFocus = (event: FocusEvent) => {
    const from = event.relatedTarget as Node | null;
    focusEdge((event.target === start) === (!!from && from !== dialog && dialog.contains(from)));
  };

  // Nothing precedes the surface in tab order, so Shift+Tab on it is handled here.
  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === Tab &&
      event.shiftKey &&
      event.target === dialog &&
      !event.defaultPrevented &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      event.preventDefault();
      focusEdge(true);
    }
  };

  // Firefox and WebKit make a dialog without `tabindex` a tab stop once it holds a positive tabindex.
  const addTabIndex = !dialog.hasAttribute('tabindex');
  if (addTabIndex) {
    dialog.tabIndex = -1;
  }
  place();
  start.addEventListener('focus', handleFocus);
  end.addEventListener('focus', handleFocus);
  dialog.addEventListener('keydown', handleKeyDown);
  // React adds children without knowing about the sentinels.
  const MutationObserverCtor = targetDocument.defaultView?.MutationObserver;
  const observer = MutationObserverCtor ? new MutationObserverCtor(place) : undefined;
  observer?.observe(dialog, { childList: true });

  return () => {
    observer?.disconnect();
    dialog.removeEventListener('keydown', handleKeyDown);
    start.remove();
    end.remove();
    if (addTabIndex) {
      dialog.removeAttribute('tabindex');
    }
  };
};

/**
 * Keeps Tab inside the `<dialog>` in `ref` while it is open as a modal in a frame. `open` and `mode` only re-run the
 * check: a dialog switched from `modal` to a popover mode stays modal until it closes.
 */
export const useLayerFrameTabWrap = (ref: React.RefObject<HTMLElement | null>, open: boolean, mode: string): void => {
  // Passive, so the sentinels arrive after `showModal()` has picked initial focus.
  React.useEffect(() => {
    const dialog = ref.current;
    const view = dialog?.ownerDocument.defaultView;
    if (isDialogElement(dialog) && dialog.open && isModal(dialog) && view && view.top !== view) {
      return trapTabInFrame(dialog);
    }
  }, [open, mode, ref]);
};
