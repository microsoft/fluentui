import * as React from 'react';
import {
  getNativeElementProps,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  ExtractSlotProps,
  Slot,
} from '@fluentui/react-utilities';
import type { ToastProps, ToastState } from './Toast.types';
import { useToast } from '../../state';

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
  const {
    visible,
    children,
    close,
    remove,
    updateId,
    announce,
    data,
    timeout: timerTimeout,
    politeness,
    ...rest
  } = props;
  const { play, running, toastRef } = useToast<HTMLDivElement>({ ...props, content: children });

  // start the toast once it's fully in
  useIsomorphicLayoutEffect(() => {
    if (toastRef.current) {
      const toast = toastRef.current;
      toast.addEventListener('animationend', play, {
        once: true,
      });
    }
  }, [play, toastRef]);

  React.useEffect(() => {
    if (visible) {
      announce(toastRef.current?.textContent ?? '', { politeness });
    }
  }, [announce, politeness, toastRef, visible, updateId]);

  // It's impossible to animate to height: auto in CSS, the actual pixel value must be known
  // Get the height of the toast before animation styles have been applied and set a CSS
  // variable with its height. The CSS variable will be used by the styles
  const onTransitionEntering = () => {
    if (!toastRef.current) {
      return;
    }

    const element = toastRef.current;
    element.style.setProperty('--fui-toast-height', `${element.scrollHeight}px`);
  };

  // Users never actually use Toast as a JSX but imperatively through useToastController
  const userRootSlot = (data as { root?: ExtractSlotProps<Slot<'div'>> }).root;

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, toastRef),
      children,
      ...rest,
      ...userRootSlot,
    }),
    timerTimeout,
    transitionTimeout: 500,
    running,
    visible,
    remove,
    close,
    onTransitionEntering,
    updateId,
    nodeRef: toastRef,
  };
};
