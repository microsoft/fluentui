import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToastProps, ToastState } from './Toast.types';
import { useToastContext } from '../../contexts/toastContext';

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
  const { titleId } = useToastContext();
  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      'aria-labelledby': titleId,
      ...props,
    }),
  };
};
