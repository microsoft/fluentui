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
import { useFocusScope } from '../../../hooks';
import { lockDocumentScroll, unlockDocumentScroll } from '../utils/scroll';
import { focusFirstTabbable } from '../utils/tabbable';
import type { DialogSurfaceProps, DialogSurfaceState } from './DialogSurface.types';

const AUTOFOCUS_ON_MOUNT = 'focusScope.autoFocusOnMount';
const AUTOFOCUS_ON_UNMOUNT = 'focusScope.autoFocusOnUnmount';
const EVENT_OPTIONS = { bubbles: false, cancelable: true } as const;

/**
 * Create the state required to render DialogSurface.
 *
 * Manages the native HTML `<dialog>` element lifecycle:
 * - Calls `showModal()` for modal/alert dialogs (native focus trap + `::backdrop`)
 * - Calls `show()` for non-modal dialogs
 * - Calls `close()` when the dialog should close
 *
 * Focus management:
 * - Tab / Shift+Tab wrap within the dialog boundary via `useFocusScope` (loop mode).
 * - On open, focus moves to the first tabbable element (links excluded); consumers can
 *   override via `onMountAutoFocus`.
 * - On close, focus is restored to the element that was focused before the dialog opened.
 *   Consumers can override via `onUnmountAutoFocus`.
 *
 * `useIsomorphicLayoutEffect` is used for open/close so that `showModal()` runs
 * synchronously after the DOM is updated but before the browser paints. This prevents
 * a frame where the dialog element is in the DOM but not yet in the top layer.
 *
 * @param props - props from this instance of DialogSurface
 * @param ref - reference to root HTMLDialogElement of DialogSurface
 */
export const useDialogSurface = (props: DialogSurfaceProps, ref: React.Ref<HTMLDialogElement>): DialogSurfaceState => {
  const { onMountAutoFocus, onUnmountAutoFocus, ...restProps } = props;
  const { open, modalType, unmountOnClose, requestOpenChange, dialogTitleId } = useDialogContext();
  const { targetDocument } = useFluent(); // Ensure we're in a Fluent context, which provides SSR support for useIsomorphicLayoutEffect

  // Keep mutable refs to callbacks so layout effects always call the latest version
  // without needing to re-run when the callbacks change identity.
  const onMountAutoFocusRef = React.useRef(onMountAutoFocus);
  const onUnmountAutoFocusRef = React.useRef(onUnmountAutoFocus);
  onMountAutoFocusRef.current = onMountAutoFocus;
  onUnmountAutoFocusRef.current = onUnmountAutoFocus;

  // The element focused before the dialog opened — used to restore focus on close.
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  // Persists the last non-null dialog element so the close branch can always access it.
  //
  // When unmountOnClose=true, React removes the <dialog> from the DOM during the
  // mutation phase — BEFORE useIsomorphicLayoutEffect fires. React also clears any
  // callback ref (set via useMergedRefs) to null at that point, so a normal ref would
  // be null by the time the effect runs. By only ever *setting* this ref (never clearing
  // it), we keep a stable pointer to the element for the close/focus-restore branch.
  const persistedDialogRef = React.useRef<HTMLDialogElement | null>(null);

  const handleRef = React.useCallback((node: HTMLDialogElement | null) => {
    if (node !== null) {
      persistedDialogRef.current = node;
    }
  }, []);

  const mergedRef = useMergedRefs(ref, handleRef);

  // Tab looping — useFocusScope provides the Tab / Shift+Tab wrap handler.
  // Focus trapping is not needed here since native showModal() handles it for modal/alert,
  // and non-modal dialogs are intentionally not trapped.
  const { containerProps: focusScopeProps } = useFocusScope({ loop: true });

  // Main effect: open/close the native dialog, manage focus, and suppress native Escape.
  //
  // Cancel (Escape) listener is co-located here — not in a separate [] effect — because
  // with unmountOnClose=true the <dialog> element unmounts when closed and re-mounts when
  // opened again. A [] effect only runs once and would miss elements that mount after the
  // initial render.
  useIsomorphicLayoutEffect(() => {
    const dialog = persistedDialogRef.current;
    if (!dialog) {
      return;
    }

    const shouldLockScroll = open && modalType !== 'non-modal' && !!targetDocument;
    if (shouldLockScroll) {
      lockDocumentScroll(targetDocument);
    }

    // Prevent the native cancel event (fired by Escape) from closing the dialog.
    // We handle Escape in onKeyDown so that React state stays authoritative.
    // Without this, the browser would close the native <dialog> before React re-renders,
    // and a controlled open={true} would fight the browser trying to reopen it.
    const handleCancel = (event: Event) => event.preventDefault();
    dialog.addEventListener('cancel', handleCancel);

    if (open) {
      // Capture the previously focused element BEFORE showModal() transfers focus.
      previouslyFocusedRef.current = targetDocument?.activeElement as HTMLElement | null;

      if (!dialog.open) {
        if (modalType !== 'non-modal') {
          dialog.showModal();
        } else {
          dialog.show();
        }
      }

      // Auto-focus: dispatch a cancellable custom event so consumers can call
      // event.preventDefault() to suppress the default focus move.
      // Only runs if nothing inside the dialog already holds focus (e.g. autofocus attr).
      if (targetDocument && !dialog.contains(targetDocument.activeElement)) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        const handleMount = (e: Event) => onMountAutoFocusRef.current?.(e, { type: AUTOFOCUS_ON_MOUNT, event: e });
        dialog.addEventListener(AUTOFOCUS_ON_MOUNT, handleMount);
        dialog.dispatchEvent(mountEvent);
        dialog.removeEventListener(AUTOFOCUS_ON_MOUNT, handleMount);

        if (!mountEvent.defaultPrevented) {
          // Focus the first tabbable element, falling back to the dialog itself.
          if (!focusFirstTabbable(dialog)) {
            dialog.focus({ preventScroll: true });
          }
        }
      }
    } else {
      // Call close() only when the element is still in the targetDocument.
      // When unmountOnClose=true, React has already removed the element from the DOM
      // before this effect fires, so dialog.isConnected is false — calling close() on
      // a disconnected element is a no-op and does not trigger native focus restoration.
      if (dialog.isConnected && dialog.open) {
        dialog.close();
      }

      // Explicitly restore focus for all dialog types. We do not rely on the browser's
      // native focus restoration from dialog.close() / element disconnection because:
      //   - Native restoration does not fire when the element is removed without close().
      //   - Browser behaviour varies across implementations.
      const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
      const handleUnmount = (e: Event) => onUnmountAutoFocusRef.current?.(e, { type: AUTOFOCUS_ON_UNMOUNT, event: e });
      dialog.addEventListener(AUTOFOCUS_ON_UNMOUNT, handleUnmount);
      dialog.dispatchEvent(unmountEvent);
      dialog.removeEventListener(AUTOFOCUS_ON_UNMOUNT, handleUnmount);

      if (!unmountEvent.defaultPrevented) {
        (previouslyFocusedRef.current ?? targetDocument?.body)?.focus({ preventScroll: true });
      }
    }

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      if (shouldLockScroll) {
        unlockDocumentScroll(targetDocument);
      }
    };
  }, [open, modalType, targetDocument]);

  // Handle keyboard events:
  // - Tab / Shift+Tab: delegated to useFocusScope for wrap-around looping.
  // - Escape: triggers requestOpenChange so React state stays in control.
  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDialogElement>) => {
    // Tab looping — run first so it can call event.preventDefault() on Tab before
    // the consumer's onKeyDown handler inspects the event.
    focusScopeProps.onKeyDown(event as React.KeyboardEvent<HTMLElement>);

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
    root: slot.always(
      getIntrinsicElementProps('dialog', {
        // role="alertdialog" for alert type; native <dialog> already has implicit role="dialog"
        role: modalType === 'alert' ? 'alertdialog' : undefined,
        // aria-modal is set implicitly by showModal(), but explicit is more robust for AT
        'aria-modal': modalType !== 'non-modal' ? true : undefined,
        // Point to DialogTitle id for accessible name
        'aria-labelledby': props['aria-label'] ? undefined : dialogTitleId || undefined,
        ...restProps,
        // tabIndex=-1 makes the dialog programmatically focusable as a fallback when no
        // tabbable child accepts focus (e.g. an empty dialog or one with only disabled elements).
        tabIndex: focusScopeProps.tabIndex,
        ref: mergedRef,
        onKeyDown: handleKeyDown,
        onClick: handleClick,
      }),
      { elementType: 'dialog' },
    ),
  };

  // Data attributes for headless styling hooks (Object.assign avoids TS issues with data-* types)
  Object.assign(state.root, {
    'data-open': stringifyDataAttribute(open),
    'data-modal-type': modalType,
  });

  return state;
};
