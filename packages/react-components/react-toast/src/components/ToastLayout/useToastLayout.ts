import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToastLayoutProps, ToastLayoutState } from './ToastLayout.types';

/**
 * Create the state required to render ToastLayout.
 *
 * The returned state can be modified with hooks such as useToastLayoutStyles_unstable,
 * before being passed to renderToastLayout_unstable.
 *
 * @param props - props from this instance of ToastLayout
 * @param ref - reference to root HTMLElement of ToastLayout
 */
export const useToastLayout_unstable = (props: ToastLayoutProps, ref: React.Ref<HTMLElement>): ToastLayoutState => {
  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
