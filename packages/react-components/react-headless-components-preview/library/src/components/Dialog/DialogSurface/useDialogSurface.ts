'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getIntrinsicElementProps,
  slot,
  useMergedRefs,
  useEventCallback,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import { useDialogContext } from '../dialogContext';
import { stringifyDataAttribute } from '../../../utils';
import { lockDocumentScroll, unlockDocumentScroll } from '../utils/scroll';
import type { DialogSurfaceProps, DialogSurfaceState } from './DialogSurface.types';

/**
 * Create the state required to render DialogSurface.
 *
 * Manages the native HTML `<dialog>` element lifecycle:
 * - Calls `showModal()` for modal/alert dialogs (native focus trap + `::backdrop`)
 * - Calls `show()` for non-modal dialogs
 * - Calls `close()` when the dialog should close
 *
 * Focus management is fully delegated to the browser:
 * - On open, the browser's native dialog focusing steps move focus to the first
 *   focusable descendant (or the dialog itself if none).
 * - On close, the browser restores focus to the element that was focused before
 *   `showModal()` / `show()` ran.
 *
 * When `unmountOnClose` is true, the DOM unmount is deferred by one render after
 * `open` flips to false so that `dialog.close()` can run on the still-connected
 * element — the browser only performs its close-time focus restoration when the
 * element is in the document.
 *
 * `useIsomorphicLayoutEffect` is used for open/close so that `showModal()` runs
 * synchronously after the DOM is updated but before the browser paints. This prevents
 * a frame where the dialog element is in the DOM but not yet in the top layer.
 *
 * @param props - props from this instance of DialogSurface
 * @param ref - reference to root HTMLDialogElement of DialogSurface
 */
export const useDialogSurface = (props: DialogSurfaceProps, ref: React.Ref<HTMLDialogElement>): DialogSurfaceState => {
  const { open, modalType, unmountOnClose, requestOpenChange, dialogTitleId } = useDialogContext();
  const { targetDocument } = useFluent(); // Ensure we're in a Fluent context, which provides SSR support for useIsomorphicLayoutEffect

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const mergedRef = useMergedRefs(ref, dialogRef);

  // Keeps the <dialog> element rendered for one extra frame after `open` flips to
  // false so the effect can call `dialog.close()` on a connected element — which is
  // what triggers the browser's native focus-restoration to `previouslyFocusedElement`.
  // Irrelevant when `unmountOnClose` is false (the element is always in the DOM).
  const [shouldRender, setShouldRender] = React.useState(open || !unmountOnClose);

  // Derived-state-during-render: when the dialog is asked to open again after an
  // unmount, re-render immediately so the element is in the DOM before the layout
  // effect runs (and before the browser paints).
  if (open && !shouldRender) {
    setShouldRender(true);
  }

  // Main effect: open/close the native dialog and suppress native Escape.
  //
  // Cancel (Escape) listener is co-located here — not in a separate [] effect — because
  // with unmountOnClose=true the <dialog> element unmounts when closed and re-mounts when
  // opened again. A [] effect only runs once and would miss elements that mount after the
  // initial render.
  useIsomorphicLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (!open) {
      // Close while the element is still connected so the browser runs its native
      // close-the-dialog steps (including focus restoration). If `unmountOnClose` is
      // true, schedule the actual DOM removal now that close has run.
      if (dialog.open) {
        dialog.close();
      }
      if (unmountOnClose) {
        setShouldRender(false);
      }
      return;
    }

    const shouldLockScroll = modalType !== 'non-modal' && !!targetDocument;
    if (shouldLockScroll) {
      lockDocumentScroll(targetDocument);
    }

    // Prevent the native cancel event (fired by Escape) from closing the dialog.
    // We handle Escape in onKeyDown so that React state stays authoritative.
    // Without this, the browser would close the native <dialog> before React re-renders,
    // and a controlled open={true} would fight the browser trying to reopen it.
    const handleCancel = (event: Event) => event.preventDefault();
    dialog.addEventListener('cancel', handleCancel);

    if (!dialog.open) {
      if (modalType !== 'non-modal') {
        dialog.showModal();
      } else {
        dialog.show();
      }
    }

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      if (shouldLockScroll) {
        unlockDocumentScroll(targetDocument);
      }
    };
  }, [open, modalType, targetDocument, unmountOnClose]);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDialogElement>) => {
    props.onKeyDown?.(event);
    if (event.key === 'Escape' && !event.isDefaultPrevented()) {
      requestOpenChange({ type: 'escapeKeyDown', open: false, event });
      // Stop propagation to avoid closing parent dialogs simultaneously.
      event.stopPropagation();
    }
  });

  // Detect backdrop click: the native <dialog> element receives click events when
  // the user clicks the backdrop (outside the dialog content bounding rect).
  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    props.onClick?.(event);
    if (modalType === 'modal' && !event.isDefaultPrevented()) {
      const rect = event.currentTarget.getBoundingClientRect();
      const isBackdropClick =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (isBackdropClick) {
        requestOpenChange({ type: 'backdropClick', open: false, event });
      }
    }
  });

  const state: DialogSurfaceState = {
    components: { root: 'dialog' },
    open,
    unmountOnClose,
    modalType,
    shouldRender,
    root: slot.always(
      getIntrinsicElementProps('dialog', {
        // role="alertdialog" for alert type; native <dialog> already has implicit role="dialog"
        role: modalType === 'alert' ? 'alertdialog' : undefined,
        // aria-modal is set implicitly by showModal(), but explicit is more robust for AT
        'aria-modal': modalType !== 'non-modal' ? true : undefined,
        // Point to DialogTitle id for accessible name
        'aria-labelledby': props['aria-label'] ? undefined : dialogTitleId || undefined,
        ...props,
        tabIndex: -1,
        ref: mergedRef,
        onKeyDown: handleKeyDown,
        onClick: handleClick,
        'data-open': stringifyDataAttribute(open),
        'data-modal-type': modalType,
      }),
      { elementType: 'dialog' },
    ),
  };

  return state;
};
