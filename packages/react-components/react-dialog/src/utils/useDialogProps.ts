import * as React from 'react';
import { isResolvedShorthand, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';

import { useDialogContext_unstable } from '../contexts/dialogContext';
import type { DialogSurfaceElementIntersection, DialogSurfaceElement, DialogSurfaceProps } from '../DialogSurface';
import { useModalAttributes } from '@fluentui/react-tabster';
import { isEscapeKeyDismiss } from './isEscapeKeyDown';

/**
 * adds additional types which are missing from current version of @types/react
 * @internal
 */
export type HTMLDialogElementProps = JSX.IntrinsicElements['dialog'] & {
  /**
   * The close event is fired on a <dialog> when it has been closed.
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * The cancel event fires on a <dialog> when
   * the user instructs the browser that they wish to dismiss the current open dialog.
   * For example, the browser might fire this event when the user presses the Esc
   * key.
   */
  onCancel?: (event: React.SyntheticEvent) => void;
};

/**
 * all logic provided to ensure compatible behavior from native and non-native dialog
 * TODO: this is a simplified version of useARIADialogProps hook that might one day be provided by @fluentui/react-aria
 */
export function useDialogProps(props: DialogSurfaceProps, ref: React.Ref<DialogSurfaceElement>) {
  const isNativeDialog = props.as === 'dialog' || props.as === undefined;
  const requestOpenChange = useDialogContext_unstable(ctx => ctx.requestOpenChange);
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const dialogRef = useDialogContext_unstable(ctx => ctx.dialogRef);
  const open = useDialogContext_unstable(ctx => ctx.open);
  const dialogTitleID = useDialogContext_unstable(ctx => ctx.dialogTitleID);
  const dialogBodyID = useDialogContext_unstable(ctx => ctx.dialogBodyID);

  const handleNativeClick = useEventCallback((event: React.MouseEvent<DialogSurfaceElementIntersection>) => {
    props.onClick?.(event);
    if (modalType === 'alert' || event.target !== event.currentTarget) {
      return;
    }
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;
    const isBackdropClick = top > clientY || clientY > top + height || left > clientX || clientX > left + width;
    if (isBackdropClick) {
      requestOpenChange({
        event,
        open: false,
        type: 'backdropClick',
      });
    }
  });

  const handleNativeCancel = useEventCallback((event: React.SyntheticEvent<DialogSurfaceElementIntersection>) => {
    (props as HTMLDialogElementProps).onCancel?.(event);
    if (event.currentTarget !== event.target) {
      return;
    }
    if (modalType !== 'alert') {
      requestOpenChange({
        event,
        open: false,
        type: 'dialogCancel',
      });
    }
    event.preventDefault();
  });

  const handleNativeClose = useEventCallback((event: React.SyntheticEvent<DialogSurfaceElementIntersection>) => {
    (props as HTMLDialogElementProps).onClose?.(event);
    // Ensure dialog remains open if force closed by close event
    if (event.currentTarget.open !== open) {
      if (open) {
        if (modalType === 'non-modal') {
          event.currentTarget.show();
        } else {
          event.currentTarget.showModal();
        }
      } else {
        event.currentTarget.close();
      }
    }
  });

  const handledBackdropClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isResolvedShorthand(props.backdrop)) {
      props.backdrop.onClick?.(event);
    }
    if (modalType === 'modal' && !event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        open: false,
        type: 'backdropClick',
      });
    }
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<DialogSurfaceElementIntersection>) => {
    props.onKeyDown?.(event);

    if (isEscapeKeyDismiss(event, modalType)) {
      requestOpenChange({
        event,
        open: false,
        type: 'escapeKeyDown',
      });
      event.preventDefault();
    }
  });

  const { modalAttributes } = useModalAttributes({ trapFocus: modalType !== 'non-modal' });

  const dialogProps = {
    ...(isNativeDialog
      ? {
          role: modalType === 'alert' ? 'alertdialog' : undefined,
          onClose: handleNativeClose,
          onClick: handleNativeClick,
          onCancel: handleNativeCancel,
        }
      : {
          'aria-modal': modalType !== 'non-modal',
          role: modalType === 'alert' ? 'alertdialog' : 'dialog',
        }),
    ref: useMergedRefs(ref, dialogRef),
    role: props.role,
    onKeyDown: handleKeyDown,
    'aria-describedby': dialogBodyID,
    'aria-labelledby': props['aria-label'] ? undefined : dialogTitleID,
    ...modalAttributes,
  } as const;

  const backdropProps = {
    'aria-hidden': 'true',
    onClick: handledBackdropClick,
  } as const;

  return [dialogProps, backdropProps] as const;
}
