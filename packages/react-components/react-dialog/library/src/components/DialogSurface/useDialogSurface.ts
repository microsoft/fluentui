'use client';

import { Escape } from '@fluentui/keyboard-keys';
import { presenceMotionSlot } from '@fluentui/react-motion';
import {
  useEventCallback,
  useMergedRefs,
  isResolvedShorthand,
  slot,
  getIntrinsicElementProps,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { useDialogContext_unstable, useDialogBackdropContext_unstable } from '../../contexts';
import { useDisableBodyScroll } from '../../utils/useDisableBodyScroll';
import { DialogBackdropMotion } from '../DialogBackdropMotion';
import { useMotionForwardedRef } from '../MotionRefForwarder';
import type { DialogSurfaceElement, DialogSurfaceProps, DialogSurfaceState } from './DialogSurface.types';

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
  const contextRef = useMotionForwardedRef();

  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const isNestedDialog = useDialogContext_unstable(ctx => ctx.isNestedDialog);
  const backdropOverride = useDialogBackdropContext_unstable();
  const treatBackdropAsNested = backdropOverride ?? isNestedDialog;

  const modalAttributes = useDialogContext_unstable(ctx => ctx.modalAttributes);
  const dialogRef = useDialogContext_unstable(ctx => ctx.dialogRef);
  const requestOpenChange = useDialogContext_unstable(ctx => ctx.requestOpenChange);
  const dialogTitleID = useDialogContext_unstable(ctx => ctx.dialogTitleId);
  const open = useDialogContext_unstable(ctx => ctx.open);
  const unmountOnClose = useDialogContext_unstable(ctx => ctx.unmountOnClose);

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

  const backdropAppearance = backdrop?.appearance;

  if (backdrop) {
    backdrop.onClick = handledBackdropClick;
    // remove backdrop.appearance so it is not passed to the DOM
    delete backdrop.appearance;
  }

  const { disableBodyScroll, enableBodyScroll } = useDisableBodyScroll();

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      enableBodyScroll();
      return;
    }

    if (isNestedDialog || modalType === 'non-modal') {
      return;
    }

    disableBodyScroll();

    return () => enableBodyScroll();
  }, [open, modalType, isNestedDialog, disableBodyScroll, enableBodyScroll]);

  return {
    components: {
      backdrop: 'div',
      root: 'div',
      backdropMotion: DialogBackdropMotion,
    },
    open,
    backdrop,
    isNestedDialog,
    treatBackdropAsNested,
    backdropAppearance,
    unmountOnClose,
    mountNode: props.mountNode,
    root: slot.always(
      getIntrinsicElementProps('div', {
        tabIndex: -1, // https://github.com/microsoft/fluentui/issues/25150
        role: modalType === 'alert' ? 'alertdialog' : 'dialog',
        'aria-modal': modalType !== 'non-modal',
        'aria-labelledby': props['aria-label'] ? undefined : dialogTitleID,
        'aria-hidden': !unmountOnClose && !open ? true : undefined,
        ...props,
        ...modalAttributes,
        onKeyDown: handleKeyDown,
        // FIXME:
        // `DialogSurfaceElement` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, contextRef, dialogRef) as React.Ref<HTMLDivElement>,
      }),
      { elementType: 'div' },
    ),
    backdropMotion: presenceMotionSlot(props.backdropMotion, {
      elementType: DialogBackdropMotion,
      defaultProps: {
        appear: unmountOnClose,
        visible: open,
      },
    }),

    // Deprecated properties
    transitionStatus: undefined,
  };
};
