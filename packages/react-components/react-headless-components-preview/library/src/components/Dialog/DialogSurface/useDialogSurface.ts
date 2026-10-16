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
import { toDataAttributeValue } from '../../../utils';
import { lockDocumentScroll, unlockDocumentScroll } from '../utils/scroll';
import { getFocusables, isInNestedLayer } from '../../../utils/focus';
import { useTopLayer } from '../../../hooks/useTopLayer/useTopLayer';
import type { DialogSurfaceProps, DialogSurfaceState } from './DialogSurface.types';

/**
 * Create the state required to render DialogSurface.
 * Top-layer lifecycle (show/hide, focus, exit animations) comes from `useTopLayer`:
 * - modal/alert => `showModal()`
 * - non-modal => `popover="manual"` + `showPopover()` (fallback to `show()`)
 *
 * @param props - props from this instance of DialogSurface
 * @param ref - reference to root HTMLDialogElement of DialogSurface
 */
export const useDialogSurface = (props: DialogSurfaceProps, ref: React.Ref<HTMLDialogElement>): DialogSurfaceState => {
  const { open, modalType, unmountOnClose, requestOpenChange, dialogTitleId } = useDialogContext();
  const { targetDocument } = useFluent();

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const mergedRef = useMergedRefs(ref, dialogRef);

  const isNonModal = modalType === 'non-modal';

  // A non-modal surface can also be toggled by a `popovertarget` invoker, mirrored as `surfaceToggle`.
  const { shouldRender, phase } = useTopLayer(dialogRef, {
    open,
    mode: isNonModal ? 'manual' : 'modal',
    role: modalType === 'alert' ? 'alertdialog' : 'dialog',
    unmountOnClose,
    // `onOpenChange` can veto a close, so Escape must not close the dialog before React decides.
    preventEscapeClose: true,
    onOpen: isNonModal ? event => requestOpenChange({ type: 'surfaceToggle', open: true, event }) : undefined,
    onClose: isNonModal ? ({ event }) => requestOpenChange({ type: 'surfaceToggle', open: false, event }) : undefined,
  });

  useIsomorphicLayoutEffect(() => {
    if (!open || modalType === 'non-modal' || !targetDocument) {
      return;
    }
    lockDocumentScroll(targetDocument);
    return () => unlockDocumentScroll(targetDocument);
  }, [open, modalType, targetDocument]);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDialogElement>) => {
    props.onKeyDown?.(event);
    // Escape inside a nested popover or dialog closes that layer first.
    if (
      event.key === 'Escape' &&
      !event.isDefaultPrevented() &&
      !isInNestedLayer(event.target as Element, event.currentTarget)
    ) {
      requestOpenChange({ type: 'escapeKeyDown', open: false, event });
      // Stop propagation to avoid closing parent dialogs simultaneously.
      event.stopPropagation();
      return;
    }

    // When the non-modal surface itself is focused, move Tab to the first
    // focusable descendant explicitly.
    if (
      modalType === 'non-modal' &&
      event.key === 'Tab' &&
      !event.shiftKey &&
      !event.isDefaultPrevented() &&
      event.target === event.currentTarget
    ) {
      const firstFocusable = getFocusables(event.currentTarget)[0];
      if (firstFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  // Backdrop click is detected by checking clicks outside the dialog rect.
  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    props.onClick?.(event);
    if (modalType !== 'modal' || event.isDefaultPrevented()) {
      return;
    }

    if (event.target !== event.currentTarget) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const isBackdropClick =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isBackdropClick) {
      requestOpenChange({ type: 'backdropClick', open: false, event });
    }
  });

  const state: DialogSurfaceState = {
    components: { root: 'dialog' },
    open,
    unmountOnClose,
    modalType,
    shouldRender,
    phase,
    root: slot.always(
      getIntrinsicElementProps('dialog', {
        role: modalType === 'alert' ? 'alertdialog' : undefined,
        'aria-modal': modalType !== 'non-modal' ? true : undefined,
        'aria-labelledby': props['aria-label'] ? undefined : dialogTitleId || undefined,
        ...props,
        tabIndex: -1,
        ref: mergedRef,
        onKeyDown: handleKeyDown,
        onClick: handleClick,
        popover: modalType === 'non-modal' ? ('manual' as const) : undefined,
        'data-open': toDataAttributeValue(open),
        'data-modal-type': modalType,
      }),
      { elementType: 'dialog' },
    ),
  };

  return state;
};
