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

const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

type ToggleEvent = Event & { newState?: 'open' | 'closed' };

/**
 * Create the state required to render DialogSurface.
 * Uses native `<dialog>` behavior:
 * - modal/alert => `showModal()`
 * - non-modal => `showPopover()` (fallback to `show()`)
 * - close => `close()`/`hidePopover()`
 *
 * @param props - props from this instance of DialogSurface
 * @param ref - reference to root HTMLDialogElement of DialogSurface
 */
export const useDialogSurface = (props: DialogSurfaceProps, ref: React.Ref<HTMLDialogElement>): DialogSurfaceState => {
  const { open, modalType, unmountOnClose, requestOpenChange, dialogTitleId } = useDialogContext();
  const { targetDocument } = useFluent();

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(ref, dialogRef);

  // Keep the element mounted one extra render so native close can run while connected.
  const [shouldRender, setShouldRender] = React.useState(open || !unmountOnClose);

  // Ensure the element exists before open side-effects run.
  if (open && !shouldRender) {
    setShouldRender(true);
  }

  const handleToggle = useEventCallback((event: Event) => {
    const toggle = event as ToggleEvent;
    const nextOpen = toggle.newState === 'open';

    if (nextOpen !== open) {
      requestOpenChange({ type: 'surfaceToggle', open: nextOpen, event });
    }
  });

  // Open/close native dialog/popover and keep listeners in sync with mounted element.
  useIsomorphicLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (!open) {
      if (modalType === 'non-modal') {
        if (typeof dialog.hidePopover === 'function') {
          const isPopoverOpen = SUPPORTS_POPOVER_OPEN_SELECTOR && dialog.matches(':popover-open');
          if (isPopoverOpen) {
            dialog.hidePopover();
          }
        } else if (dialog.open) {
          dialog.close();
        }

        const elementToFocus = previouslyFocusedElement.current;
        if (elementToFocus && targetDocument?.contains(elementToFocus)) {
          elementToFocus.focus();
        }
        previouslyFocusedElement.current = null;
      } else if (dialog.open) {
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

    if (modalType === 'non-modal') {
      previouslyFocusedElement.current = targetDocument?.activeElement as HTMLElement | null;
    }

    let handleCancel: ((event: Event) => void) | undefined;
    if (modalType !== 'non-modal') {
      // Let React own close state; prevent native Escape auto-close.
      handleCancel = (event: Event) => event.preventDefault();
      dialog.addEventListener('cancel', handleCancel);
    }

    if (modalType !== 'non-modal') {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (typeof dialog.showPopover === 'function') {
      const isPopoverOpen = SUPPORTS_POPOVER_OPEN_SELECTOR && dialog.matches(':popover-open');
      if (!isPopoverOpen) {
        dialog.showPopover();
      }

      dialog.addEventListener('toggle', handleToggle);
    } else if (!dialog.open) {
      dialog.show();
    }

    return () => {
      if (handleCancel) {
        dialog.removeEventListener('cancel', handleCancel);
      }
      dialog.removeEventListener('toggle', handleToggle);
      if (shouldLockScroll) {
        unlockDocumentScroll(targetDocument);
      }
    };
  }, [open, modalType, targetDocument, unmountOnClose, handleToggle]);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDialogElement>) => {
    props.onKeyDown?.(event);
    if (event.key === 'Escape' && !event.isDefaultPrevented()) {
      requestOpenChange({ type: 'escapeKeyDown', open: false, event });
      // Stop propagation to avoid closing parent dialogs simultaneously.
      event.stopPropagation();
    }
  });

  // Backdrop click is detected by checking clicks outside the dialog rect.
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
        role: modalType === 'alert' ? 'alertdialog' : undefined,
        'aria-modal': modalType !== 'non-modal' ? true : undefined,
        'aria-labelledby': props['aria-label'] ? undefined : dialogTitleId || undefined,
        ...props,
        tabIndex: -1,
        ref: mergedRef,
        onKeyDown: handleKeyDown,
        onClick: handleClick,
        popover: modalType === 'non-modal' ? ('manual' as const) : undefined,
        'data-open': stringifyDataAttribute(open),
        'data-modal-type': modalType,
      }),
      { elementType: 'dialog' },
    ),
  };

  return state;
};
