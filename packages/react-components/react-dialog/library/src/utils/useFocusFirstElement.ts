'use client';

import * as React from 'react';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type { DialogSurfaceElement } from '../DialogSurface';
import type { DialogModalType } from '../Dialog';

/**
 * Removes stale `aria-hidden="true"` from ancestor nodes of `element` up to (but not including)
 * `document.body`.
 *
 * This is a temporary mitigation for a Tabster Modalizer limitation where closing a stacked sibling
 * dialog can leave a stale `aria-hidden` on the underlying dialog's portal mount node, blocking
 * browser focus from entering the subtree.
 *
 * The fix is safe because:
 * - It only runs when `open === true` (the dialog's own Modalizer is active).
 * - It only touches direct ancestors of the dialog surface — not unrelated siblings.
 * - Tabster's active Modalizer will immediately re-apply correct `aria-hidden` state on the next
 *   mutation cycle if the attribute was legitimately supposed to be there.
 *
 * TODO: Remove once Tabster Modalizer supports a proper activation stack.
 * @see https://github.com/microsoft/fluentui/issues/35985
 *
 * @internal
 */
function removeStaleAriaHiddenFromAncestors(element: HTMLElement): void {
  let current = element.parentElement;
  while (current && current.ownerDocument && current !== current.ownerDocument.body) {
    if (current.getAttribute('aria-hidden') === 'true') {
      current.removeAttribute('aria-hidden');
    }
    current = current.parentElement;
  }
}

/**
 * Focus first element on content when dialog is opened.
 * Also clears stale `aria-hidden` from portal ancestor nodes before focusing,
 * guarding against the stacked-sibling-dialog focus trap breakage described in
 * https://github.com/microsoft/fluentui/issues/35985.
 */
export function useFocusFirstElement(
  open: boolean,
  modalType: DialogModalType,
): React.RefObject<DialogSurfaceElement | null> {
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent_unstable();
  const dialogRef = React.useRef<DialogSurfaceElement | null>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const dialogEl = dialogRef.current;
    if (!dialogEl) {
      return;
    }

    // Workaround for https://github.com/microsoft/fluentui/issues/35985:
    // Strip any stale aria-hidden="true" from ancestors of the dialog surface before focusing.
    removeStaleAriaHiddenFromAncestors(dialogEl);

    const element = findFirstFocusable(dialogEl);
    if (element) {
      element.focus();
    } else {
      dialogEl.focus(); // https://github.com/microsoft/fluentui/issues/25150
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(/** #__DE-INDENT__ */ `
          @fluentui/react-dialog [useFocusFirstElement]:
          A Dialog should have at least one focusable element inside DialogSurface.
          Please add at least a close button either on \`DialogTitle\` action slot or inside \`DialogActions\`
        `);
      }
    }
  }, [findFirstFocusable, open, modalType, targetDocument]);

  return dialogRef;
}
