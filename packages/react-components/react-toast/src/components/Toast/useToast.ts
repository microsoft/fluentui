import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ToastProps, ToastState } from './Toast.types';

/**
 * Create the state required to render Toast.
 *
 * The returned state can be modified with hooks such as useToastStyles_unstable,
 * before being passed to renderToast_unstable.
 *
 * @param props - props from this instance of Toast
 * @param ref - reference to root HTMLElement of Toast
 */
export const useToast_unstable = (props: ToastProps, ref: React.Ref<HTMLElement>): ToastState => {
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
    backgroundAppearance: props.appearance,
  };
};
