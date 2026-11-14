'use client';

import * as React from 'react';
import { Tab } from '@fluentui/keyboard-keys';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isModal } from './utils';
import { FOCUSABLE_CANDIDATE_SELECTOR, getTabIndex } from '../../utils/focusable';

/**
 * Whether the document is rendered inside a frame. Reading `top` is allowed across origins.
 */
export const isInFrame = (targetDocument: Document | undefined): boolean => {
  const view = targetDocument?.defaultView;
  return !!view && view.top !== view;
};

/**
 * The innermost open modal `<dialog>` containing the element, or `null`.
 */
const getClosestModalDialog = (element: Element): HTMLDialogElement | null => {
  let current = element.closest('dialog');
  while (current && !isModal(current)) {
    current = current.parentElement?.closest('dialog') ?? null;
  }
  return current;
};

const isTabStop = (element: HTMLElement, dialog: HTMLDialogElement, checkedRadios: HTMLInputElement[]): boolean => {
  if (getTabIndex(element) < 0 || element.matches(':disabled') || element.closest('[inert]')) {
    return false;
  }
  // Content of a nested modal belongs to that dialog's own tab cycle.
  if (getClosestModalDialog(element) !== dialog) {
    return false;
  }
  // Only the checked radio of a group is a tab stop. Tag check, not `instanceof`: the dialog may be in another realm.
  const input = element as HTMLInputElement;
  if (
    element.tagName === 'INPUT' &&
    input.type === 'radio' &&
    !input.checked &&
    checkedRadios.some(radio => radio.name === input.name && radio.form === input.form)
  ) {
    return false;
  }
  // Skips `display: none`, `content-visibility: hidden` and closed `<details>` content.
  return typeof element.checkVisibility === 'function' ? element.checkVisibility({ visibilityProperty: true }) : true;
};

/**
 * The dialog's tab stops in tab order: positive `tabindex` first, then document order.
 */
export const getDialogTabStops = (dialog: HTMLDialogElement): HTMLElement[] => {
  const checkedRadios = Array.from(
    dialog.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked:not([name=""])[name]'),
  );
  const order = (element: HTMLElement) => getTabIndex(element) || Number.MAX_SAFE_INTEGER;
  return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_CANDIDATE_SELECTOR))
    .filter(element => isTabStop(element, dialog, checkedRadios))
    .sort((a, b) => order(a) - order(b));
};

const createSentinel = (targetDocument: Document, tabIndex: number): HTMLElement => {
  const sentinel = targetDocument.createElement('span');
  sentinel.tabIndex = tabIndex;
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText =
    'position:fixed;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;pointer-events:none';
  return sentinel;
};

/**
 * Keeps Tab and Shift+Tab inside a modal dialog rendered in a frame. Returns a cleanup function.
 *
 * `showModal()` only makes the dialog's own document inert. At the top level, Tab from the last element moves to the
 * browser UI, which is the expected native behavior. Inside a frame it moves into the host page instead, which stays
 * interactive behind the modal.
 *
 * Focusable sentinels at both ends of the dialog let the browser decide when Tab reaches an edge, whatever its tab
 * order (positive `tabindex`, radio groups, Safari skipping buttons and links). A focused sentinel moves focus to the
 * tab stop at the other end, or at its own end when focus comes from outside the dialog or the surface itself. Nothing
 * precedes the surface, so Shift+Tab on it is handled on keydown. A handled Tab (`preventDefault()`) never reaches a
 * sentinel.
 */
export const trapTabInFrame = (dialog: HTMLDialogElement): (() => void) => {
  const targetDocument = dialog.ownerDocument;
  // `tabindex="1"` puts the start sentinel before any positive tabindex, and only the dialog is not inert.
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

  const handleFocus = (event: FocusEvent) => {
    const from = event.relatedTarget as Node | null;
    // From the surface itself, Tab reaches the start sentinel first, like Tab from outside.
    const fromInside = !!from && from !== dialog && from !== start && from !== end && dialog.contains(from);
    focusEdge((event.target === start) === fromInside);
  };

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

  // Firefox and WebKit make a dialog without `tabindex` a tab stop once it holds a positive tabindex. `-1` also lets
  // `handleFocus` fall back to the surface.
  const addTabIndex = !dialog.hasAttribute('tabindex');
  if (addTabIndex) {
    dialog.tabIndex = -1;
  }
  place();
  start.addEventListener('focus', handleFocus);
  end.addEventListener('focus', handleFocus);
  dialog.addEventListener('keydown', handleKeyDown);
  // React appends and replaces children without knowing about the sentinels, so move them back to the ends.
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
 * While `active`, keeps Tab inside the modal `<dialog>` in `ref` when its document is rendered in a frame.
 */
export const useLayerFrameTabWrap = (ref: React.RefObject<HTMLElement | null>, active: boolean): void => {
  const { targetDocument } = useFluent();

  // A passive effect, so the sentinels arrive after `showModal()` has picked its initial focus.
  React.useEffect(() => {
    const dialog = ref.current;
    if (!active || !dialog || dialog.tagName !== 'DIALOG' || !isInFrame(targetDocument)) {
      return;
    }
    return trapTabInFrame(dialog as HTMLDialogElement);
  }, [active, ref, targetDocument]);
};
