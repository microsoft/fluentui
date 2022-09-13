import * as React from 'react';
import {
  getNativeElementProps,
  resolveShorthand,
  useEventCallback,
  useMergedRefs,
  isResolvedShorthand,
} from '@fluentui/react-utilities';
import type {
  DialogSurfaceElement,
  DialogSurfaceElementIntersection,
  DialogSurfaceProps,
  DialogSurfaceState,
} from './DialogSurface.types';
import { useDialogContext_unstable } from '../../contexts';
import { isEscapeKeyDismiss, HTMLDialogElementProps } from '../../utils';
import { useModalAttributes } from '@fluentui/react-tabster';
/**
 * Create the state required to render DialogSurface.
 *
 * The returned state can be modified with hooks such as useDialogSurfaceStyles_unstable,
 * before being passed to renderDialogSurface_unstable.
 *
 * @param props - props from this instance of DialogSurface
 * @param ref - reference to root HTMLElement of DialogSurface
 */
export const useDialogSurface_unstable = (
  props: DialogSurfaceProps,
  ref: React.Ref<DialogSurfaceElement>,
): DialogSurfaceState => {
  const { backdrop, as } = props;
  const isNativeDialog = as === 'dialog' || as === undefined;
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const dialogRef = useDialogContext_unstable(ctx => ctx.dialogRef);
  const open = useDialogContext_unstable(ctx => ctx.open);
  const requestOpenChange = useDialogContext_unstable(ctx => ctx.requestOpenChange);
  const dialogTitleID = useDialogContext_unstable(ctx => ctx.dialogTitleID);
  const dialogBodyID = useDialogContext_unstable(ctx => ctx.dialogBodyID);
  const isNestedDialog = useDialogContext_unstable(ctx => ctx.isNestedDialog);

  const handleNativeClick = useEventCallback((event: React.MouseEvent<DialogSurfaceElementIntersection>) => {
    props.onClick?.(event);
    if (modalType === 'alert' || event.target !== event.currentTarget) {
      return;
    }
    const { clientX, clientY } = event;
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
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
      if (isNestedDialog) {
        // Escape keydown should be stopped to avoid closing multiple dialogs
        event.stopPropagation();
      }
    }
  });

  const { modalAttributes } = useModalAttributes({ trapFocus: modalType !== 'non-modal' });

  return {
    components: {
      backdrop: 'div',
      root: 'dialog',
    },
    backdrop: resolveShorthand(backdrop, {
      required: !isNativeDialog && open && modalType !== 'non-modal',
      defaultProps: {
        'aria-hidden': 'true',
        onClick: handledBackdropClick,
      },
    }),
    root: getNativeElementProps(as ?? 'dialog', {
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
      ...props,
      ...modalAttributes,
      onKeyDown: handleKeyDown,
      'aria-describedby': dialogBodyID,
      'aria-labelledby': props['aria-label'] ? undefined : dialogTitleID,
      ref: useMergedRefs(ref, dialogRef),
    }),
  };
};
