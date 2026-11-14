import { isDialogElement, isModal } from '../../../hooks/top-layer/utils';

const TABBABLE_CANDIDATES = [
  'a[href]',
  'area[href]',
  'button',
  'input',
  'select',
  'textarea',
  'iframe',
  'summary',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
].join(', ');

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
  while (current) {
    if (isDialogElement(current) && current.open && isModal(current)) {
      return current;
    }
    current = current.parentElement?.closest('dialog') ?? null;
  }
  return null;
};

const isTabbable = (element: HTMLElement, dialog: HTMLDialogElement): boolean => {
  if (element.tabIndex < 0 || element.matches(':disabled') || element.closest('[inert]')) {
    return false;
  }
  // Content of a nested modal belongs to that dialog's own tab cycle.
  if (getClosestModalDialog(element) !== dialog) {
    return false;
  }
  // Only the checked radio of a group is a tab stop.
  // Tag check instead of `instanceof`: the dialog may live in another frame's realm.
  if (element.tagName === 'INPUT') {
    const input = element as HTMLInputElement;
    if (input.type === 'radio' && !input.checked && input.name) {
      const radios = Array.from(dialog.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
      if (radios.some(radio => radio.name === input.name && radio.form === input.form && radio.checked)) {
        return false;
      }
    }
  }
  // `checkVisibility` skips `display: none`, `content-visibility: hidden` and closed `<details>` content.
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
export const wrapFrameDialogTab = (dialog: HTMLDialogElement, target: Element, shiftKey: boolean): boolean => {
  if (getClosestModalDialog(target) !== dialog) {
    return false;
  }

  const tabbables = Array.from(dialog.querySelectorAll<HTMLElement>(TABBABLE_CANDIDATES)).filter(element =>
    isTabbable(element, dialog),
  );

  if (tabbables.length === 0) {
    dialog.focus();
    return true;
  }

  // Wrap only when the browser would otherwise move past the dialog's last (or first) tab stop.
  const position = shiftKey ? dialog.DOCUMENT_POSITION_PRECEDING : dialog.DOCUMENT_POSITION_FOLLOWING;
  const hasNextInDialog = tabbables.some(
    // eslint-disable-next-line no-bitwise
    element => element !== target && target.compareDocumentPosition(element) & position,
  );
  if (hasNextInDialog) {
    return false;
  }

  const next = shiftKey ? tabbables[tabbables.length - 1] : tabbables[0];
  next.focus();
  return true;
};
