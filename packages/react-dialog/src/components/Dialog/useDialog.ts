import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import type { DialogProps, DialogState } from './Dialog.types';
import { useModalAttributes, useFocusFinders } from '@fluentui/react-tabster';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks such as useDialogStyles_unstable,
 * before being passed to renderDialog_unstable.
 *
 * @param props - props from this instance of Dialog
 * @param ref - reference to root HTMLElement of Dialog
 */
export const useDialog_unstable = (props: DialogProps, ref: React.Ref<HTMLElement>): DialogState => {
  const { overlay, isOpen = false, type = 'modal' } = props;
  const isNonModal = type === 'non-modal';

  const contentRef = React.useRef(null);
  const { modalAttributes } = useModalAttributes({ trapFocus: !isNonModal && true });
  const { findFirstFocusable } = useFocusFinders();

  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      const firstFocusable = findFirstFocusable(contentRef.current);
      firstFocusable?.focus();
    }
  }, [isOpen, contentRef, findFirstFocusable]);

  const state: DialogState = {
    isOpen,
    type,
    components: {
      root: 'div',
      overlay: 'div',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, contentRef),
      role: 'dialog',
      'aria-modal': !isNonModal && true,
      'aria-label': 'dialog',
      ...modalAttributes,
      ...props,
    }),
    overlay: resolveShorthand(overlay),
  };

  if (type === 'alert') {
    state.root.role = 'alertdialog';
  }

  return state;
};
