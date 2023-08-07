import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
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
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
