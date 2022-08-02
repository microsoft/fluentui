import * as React from 'react';
import { getNativeElementProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useModalAttributes } from '@fluentui/react-tabster';
import type { DialogSurfaceProps, DialogSurfaceState } from './DialogSurface.types';
import { useDialogContext_unstable } from '../../contexts';
import { isEscapeKeyDismiss } from '../../utils';

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
  ref: React.Ref<HTMLElement>,
): DialogSurfaceState => {
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const { as = 'div' } = props;

  const contentRef = useDialogContext_unstable(ctx => ctx.contentRef);
  const dialogTitleID = useDialogContext_unstable(ctx => ctx.dialogTitleID);
  const dialogBodyID = useDialogContext_unstable(ctx => ctx.dialogBodyID);
  const requestOpenChange = useDialogContext_unstable(ctx => ctx.requestOpenChange);

  const { modalAttributes } = useModalAttributes({ trapFocus: modalType !== 'non-modal' });

  const handleRootKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    props.onKeyDown?.(event);
    if (isEscapeKeyDismiss(event, modalType)) {
      requestOpenChange({ event, open: false, type: 'escapeKeyDown' });
      event.preventDefault();
    }
  });

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps(as, {
      ref: useMergedRefs(ref, contentRef),
      'aria-modal': modalType !== 'non-modal',
      'aria-describedby': dialogBodyID,
      'aria-labelledby': props['aria-label'] ? undefined : dialogTitleID,
      role: modalType === 'alert' ? 'alertdialog' : 'dialog',
      ...props,
      ...modalAttributes,
      onKeyDown: handleRootKeyDown,
    }),
  };
};
