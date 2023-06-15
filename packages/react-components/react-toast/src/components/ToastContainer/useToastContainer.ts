import * as React from 'react';
import {
  getNativeElementProps,
  useMergedRefs,
  ExtractSlotProps,
  Slot,
  useEventCallback,
  resolveShorthand,
} from '@fluentui/react-utilities';
import type { ToastContainerProps, ToastContainerState } from './ToastContainer.types';
import { useToast } from '../../state';
import { Timer, TimerProps } from '../Timer/Timer';

const intentPolitenessMap = {
  success: 'assertive',
  warning: 'assertive',
  error: 'assertive',
  info: 'polite',
} as const;

/**
 * Create the state required to render ToastContainer.
 *
 * The returned state can be modified with hooks such as useToastContainerStyles_unstable,
 * before being passed to renderToastContainer_unstable.
 *
 * @param props - props from this instance of ToastContainer
 * @param ref - reference to root HTMLElement of ToastContainer
 */
export const useToastContainer_unstable = (
  props: ToastContainerProps,
  ref: React.Ref<HTMLElement>,
): ToastContainerState => {
  const {
    visible,
    children,
    close,
    remove,
    updateId,
    announce,
    data,
    timeout: timerTimeout,
    politeness: desiredPoliteness,
    intent = 'info',
    ...rest
  } = props;
  const { play, running, toastRef } = useToast<HTMLDivElement>({ ...props });

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    const politeness = desiredPoliteness ?? intentPolitenessMap[intent];
    announce(toastRef.current?.textContent ?? '', { politeness });
  }, [announce, desiredPoliteness, toastRef, visible, updateId, intent]);

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

  // Users never actually use ToastContainer as a JSX but imperatively through useToastContainerController
  const userRootSlot = (data as { root?: ExtractSlotProps<Slot<'div'>> }).root;

  const onAnimationEnd = useEventCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    // start toast once it's fully animated in
    play();
    userRootSlot?.onAnimationEnd?.(e);
  });

  return {
    components: {
      timer: Timer,
      root: 'div',
    },
    timer: resolveShorthand<TimerProps>(
      { key: updateId, onTimeout: close, running, timeout: timerTimeout ?? -1 },
      { required: true },
    ),
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, toastRef),
      children,
      ...rest,
      ...userRootSlot,
      onAnimationEnd,
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
    intent,
  };
};
