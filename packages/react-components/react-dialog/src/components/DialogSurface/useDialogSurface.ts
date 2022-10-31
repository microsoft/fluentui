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
import { isEscapeKeyDismiss } from '../../utils';
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
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const dialogRef = useDialogContext_unstable(ctx => ctx.dialogRef);
  const open = useDialogContext_unstable(ctx => ctx.open);
  const requestOpenChange = useDialogContext_unstable(ctx => ctx.requestOpenChange);
  const dialogTitleID = useDialogContext_unstable(ctx => ctx.dialogTitleId);
  const dialogContentId = useDialogContext_unstable(ctx => ctx.dialogContentId);

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
      // stop propagation to avoid conflicting with other elements that listen for `Escape`
      // e,g: nested Dialog, Popover, Menu and Tooltip
      event.stopPropagation();
    }
  });

  const { modalAttributes } = useModalAttributes({ trapFocus: modalType !== 'non-modal' });

  return {
    components: {
      backdrop: 'div',
      root: 'div',
    },
    backdrop: resolveShorthand(backdrop, {
      required: open && modalType !== 'non-modal',
      defaultProps: {
        'aria-hidden': 'true',
        onClick: handledBackdropClick,
      },
    }),
    root: getNativeElementProps(as ?? 'div', {
      tabIndex: -1, // https://github.com/microsoft/fluentui/issues/25150
      'aria-modal': modalType !== 'non-modal',
      role: modalType === 'alert' ? 'alertdialog' : 'dialog',
      'aria-describedby': dialogContentId,
      'aria-labelledby': props['aria-label'] ? undefined : dialogTitleID,
      ...props,
      ...modalAttributes,
      onKeyDown: handleKeyDown,
      ref: useMergedRefs(ref, dialogRef),
    }),
  };
};
