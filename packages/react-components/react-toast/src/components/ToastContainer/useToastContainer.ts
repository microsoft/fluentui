import * as React from 'react';
import {
  getNativeElementProps,
  useMergedRefs,
  ExtractSlotProps,
  Slot,
  useEventCallback,
  resolveShorthand,
} from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type { ToastContainerProps, ToastContainerState } from './ToastContainer.types';
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
    pauseOnHover,
    pauseOnWindowBlur,
    ...rest
  } = props;
  const toastRef = React.useRef<HTMLDivElement | null>(null);
  const { targetDocument } = useFluent_unstable();
  const [running, setRunning] = React.useState(false);
  const pause = useEventCallback(() => setRunning(false));
  const play = useEventCallback(() => setRunning(true));

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    if (pauseOnWindowBlur) {
      targetDocument.defaultView?.addEventListener('focus', play);
      targetDocument.defaultView?.addEventListener('blur', pause);
      return () => {
        targetDocument.defaultView?.removeEventListener('focus', play);
        targetDocument.defaultView?.removeEventListener('blur', pause);
      };
    }
  }, [targetDocument, pause, play, pauseOnWindowBlur]);

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

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    pause();
    userRootSlot?.onMouseEnter?.(e);
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    play();
    userRootSlot?.onMouseEnter?.(e);
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
      onMouseEnter,
      onMouseLeave,
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
