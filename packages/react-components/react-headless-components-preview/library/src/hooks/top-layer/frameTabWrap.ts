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

const isTabbable = (element: HTMLElement, dialog: HTMLDialogElement, checkedRadios: HTMLInputElement[]): boolean => {
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
 * Keeps Tab and Shift+Tab inside a modal dialog rendered in a frame.
 *
 * `showModal()` only makes the dialog's own document inert. At the top level, Tab from the last element moves to the
 * browser UI, which is the expected native behavior. Inside a frame it moves into the host page instead, which stays
 * interactive behind the modal, so focus wraps to the other end of the dialog.
 *
 * Returns `true` when it moved focus; the caller should then prevent the default action.
 */
export const wrapModalTabInFrame = (dialog: HTMLDialogElement, target: Element, shiftKey: boolean): boolean => {
  if (getClosestModalDialog(target) !== dialog) {
    return false;
  }

  const checkedRadios = Array.from(
    dialog.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked:not([name=""])[name]'),
  );
  const tabbables = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_CANDIDATE_SELECTOR)).filter(element =>
    isTabbable(element, dialog, checkedRadios),
  );

  if (tabbables.length === 0) {
    dialog.focus();
    return true;
  }

  // Tab stops are in document order, so the browser leaves the dialog only when the target is at or past the edge.
  const [first, last] = [tabbables[0], tabbables[tabbables.length - 1]];
  const edge = shiftKey ? first : last;
  const position = shiftKey ? dialog.DOCUMENT_POSITION_PRECEDING : dialog.DOCUMENT_POSITION_FOLLOWING;
  // eslint-disable-next-line no-bitwise
  if (edge !== target && target.compareDocumentPosition(edge) & position) {
    return false;
  }

  (shiftKey ? last : first).focus();
  return true;
};

/**
 * While `active`, wraps Tab inside the modal `<dialog>` in `ref` when its document is rendered in a frame. Listens on
 * the document in the bubble phase, after React's handlers, so a consumer's `onKeyDown` can prevent the wrap.
 */
export const useLayerFrameTabWrap = (ref: React.RefObject<HTMLElement | null>, active: boolean): void => {
  const { targetDocument } = useFluent();

  React.useEffect(() => {
    if (!active || !targetDocument || !isInFrame(targetDocument)) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const dialog = ref.current;
      const target = event.target as Element | null;
      if (
        event.key !== Tab ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        !dialog ||
        !target ||
        dialog.tagName !== 'DIALOG' ||
        !dialog.contains(target)
      ) {
        return;
      }
      if (wrapModalTabInFrame(dialog as HTMLDialogElement, target, event.shiftKey)) {
        event.preventDefault();
      }
    };

    targetDocument.addEventListener('keydown', handleKeyDown);
    return () => targetDocument.removeEventListener('keydown', handleKeyDown);
  }, [active, ref, targetDocument]);
};
