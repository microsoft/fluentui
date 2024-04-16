import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ToastFooterProps, ToastFooterState } from './ToastFooter.types';

/**
 * Create the state required to render ToastFooter.
 *
 * The returned state can be modified with hooks such as useToastFooterStyles_unstable,
 * before being passed to renderToastFooter_unstable.
 *
 * @param props - props from this instance of ToastFooter
 * @param ref - reference to root HTMLElement of ToastFooter
 */
export const useToastFooter_unstable = (props: ToastFooterProps, ref: React.Ref<HTMLElement>): ToastFooterState => {
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
  };
};
