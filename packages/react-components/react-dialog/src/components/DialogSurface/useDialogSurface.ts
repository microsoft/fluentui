import * as React from 'react';
import {
  useEventCallback,
  useMergedRefs,
  isResolvedShorthand,
  slot,
  getIntrinsicElementProps,
} from '@fluentui/react-utilities';
import type { DialogSurfaceElement, DialogSurfaceProps, DialogSurfaceState } from './DialogSurface.types';
import { useDialogContext_unstable } from '../../contexts';
import { Escape } from '@fluentui/keyboard-keys';
import { useDialogTransitionContext_unstable } from '../../contexts/dialogTransitionContext';

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
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const isNestedDialog = useDialogContext_unstable(ctx => ctx.isNestedDialog);
  const transitionStatus = useDialogTransitionContext_unstable();
  const modalAttributes = useDialogContext_unstable(ctx => ctx.modalAttributes);
  const dialogRef = useDialogContext_unstable(ctx => ctx.dialogRef);
  const requestOpenChange = useDialogContext_unstable(ctx => ctx.requestOpenChange);
  const dialogTitleID = useDialogContext_unstable(ctx => ctx.dialogTitleId);

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

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    props.onKeyDown?.(event);

    if (event.key === Escape && !event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        open: false,
        type: 'escapeKeyDown',
      });
      // stop propagation to avoid conflicting with other elements that listen for `Escape`
      // e,g: nested Dialog, Popover, Menu and Tooltip
      event.preventDefault();
    }
  });

  const backdrop = slot.optional(props.backdrop, {
    renderByDefault: modalType !== 'non-modal',
    defaultProps: {
      'aria-hidden': 'true',
    },
    elementType: 'div',
  });
  if (backdrop) {
    backdrop.onClick = handledBackdropClick;
  }
  return {
    components: { backdrop: 'div', root: 'div' },
    backdrop,
    isNestedDialog,
    transitionStatus,
    mountNode: props.mountNode,
    root: slot.always(
      getIntrinsicElementProps('div', {
        tabIndex: -1, // https://github.com/microsoft/fluentui/issues/25150
        'aria-modal': modalType !== 'non-modal',
        role: modalType === 'alert' ? 'alertdialog' : 'dialog',
        'aria-labelledby': props['aria-label'] ? undefined : dialogTitleID,
        ...props,
        ...modalAttributes,
        onKeyDown: handleKeyDown,
        // FIXME:
        // `DialogSurfaceElement` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, dialogRef) as React.Ref<HTMLDivElement>,
      }),
      { elementType: 'div' },
    ),
  };
};
