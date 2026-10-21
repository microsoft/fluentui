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
import { useDialogLayerOpenState, useLayerPresence } from '../../../hooks/top-layer';
import { isEscapeForLayer } from '../../../hooks/top-layer/utils';
import type { DialogSurfaceProps, DialogSurfaceState } from './DialogSurface.types';

/**
 * Create the state required to render DialogSurface.
 * Show/hide and exit come from the top-layer hooks: `showModal()` for modal and alert, `popover="manual"` for
 * non-modal.
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

  // Non-modal: return focus to the element focused before opening. Read before the open-state hook shows the
  // surface, which can move focus into it.
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);
  useIsomorphicLayoutEffect(() => {
    if (isNonModal && open) {
      previouslyFocusedElement.current = targetDocument?.activeElement as HTMLElement | null;
    }
  }, [open, isNonModal, targetDocument]);

  // A browser open or close (`popovertarget`, `commandfor`, `<form method="dialog">`) is reported as `surfaceToggle`.
  useDialogLayerOpenState(dialogRef, {
    open,
    mode: isNonModal ? 'manual' : 'modal',
    onOpenChange: (nextOpen, { event }) => requestOpenChange({ type: 'surfaceToggle', open: nextOpen, event }),
  });

  const { shouldRender, phase } = useLayerPresence(dialogRef, { open, unmountOnClose });

  // After the open-state hook hid the surface.
  useIsomorphicLayoutEffect(() => {
    if (!isNonModal || open) {
      return;
    }
    const elementToFocus = previouslyFocusedElement.current;
    if (elementToFocus && targetDocument?.contains(elementToFocus)) {
      elementToFocus.focus();
    }
    previouslyFocusedElement.current = null;
  }, [open, isNonModal, targetDocument]);

  // Let React own the close state: block the browser closing a modal on Escape, so `onOpenChange` can veto it.
  useIsomorphicLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || isNonModal || !dialog) {
      return;
    }
    const preventCancel = (event: Event) => event.preventDefault();
    dialog.addEventListener('cancel', preventCancel);
    return () => dialog.removeEventListener('cancel', preventCancel);
  }, [open, isNonModal]);

  useIsomorphicLayoutEffect(() => {
    if (!open || modalType === 'non-modal' || !targetDocument) {
      return;
    }
    lockDocumentScroll(targetDocument);
    return () => unlockDocumentScroll(targetDocument);
  }, [open, modalType, targetDocument]);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDialogElement>) => {
    props.onKeyDown?.(event);
    if (
      event.key === 'Escape' &&
      !event.isDefaultPrevented() &&
      // Leave Escape to a popover or dialog nested inside. Content portaled out of the surface still counts.
      isEscapeForLayer(event.currentTarget, event.target as Element)
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
      const firstFocusable = event.currentTarget.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
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
