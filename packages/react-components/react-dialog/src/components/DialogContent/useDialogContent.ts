import * as React from 'react';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import type { DialogContentProps, DialogContentState } from './DialogContent.types';
import { useDialogContext_unstable } from '../../contexts/dialogContext';
import { useModalAttributes } from '@fluentui/react-tabster';

/**
 * Create the state required to render DialogContent.
 *
 * The returned state can be modified with hooks such as useDialogContentStyles_unstable,
 * before being passed to renderDialogContent_unstable.
 *
 * @param props - props from this instance of DialogContent
 * @param ref - reference to root HTMLElement of DialogContent
 */
export const useDialogContent_unstable = (
  props: DialogContentProps,
  ref: React.Ref<HTMLElement>,
): DialogContentState => {
  const { as = 'div' } = props;

  const contentRef = useDialogContext_unstable(ctx => ctx.contentRef);
  const type = useDialogContext_unstable(ctx => ctx.modalType);

  const { modalAttributes } = useModalAttributes({
    trapFocus: type !== 'non-modal',
  });

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps(as, {
      ref: useMergedRefs(ref, contentRef),
      ...props,
      ...modalAttributes,
    }),
  };
};
