import * as React from 'react';
import {
  getNativeElementProps,
  useMergedRefs,
  ExtractSlotProps,
  Slot,
  useEventCallback,
  resolveShorthand,
  useId,
  useMotionPresence,
} from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { ToastStatus } from '../../state';
import type { ToastContainerProps, ToastContainerState } from './ToastContainer.types';
import { Timer, TimerProps } from '../Timer/Timer';
import { useFocusFinders } from '@fluentui/react-tabster';

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
    close: closeProp,
    remove,
    updateId,
    announce,
    data,
    timeout: timerTimeout,
    politeness: desiredPoliteness,
    intent = 'info',
    pauseOnHover,
    pauseOnWindowBlur,
    imperativeRef,
    tryRestoreFocus,
    ...rest
  } = props;
  const titleId = useId('toast-title');
  const bodyId = useId('toast-body');
  const toastRef = React.useRef<HTMLDivElement | null>(null);
  const { targetDocument } = useFluent_unstable();
  const [running, setRunning] = React.useState(false);
  const imperativePauseRef = React.useRef(false);
  const focusedToastBeforeClose = React.useRef(false);
  const { ref: toastMotionRef, shouldRender, visible: motionVisible } = useMotionPresence<HTMLDivElement>(visible);

  const close = useEventCallback(() => {
    const activeElement = targetDocument?.activeElement;
    if (activeElement && toastRef.current?.contains(activeElement)) {
      focusedToastBeforeClose.current = true;
    }

    closeProp();
  });
  const onStatusChange = useEventCallback((status: ToastStatus) => props.onStatusChange?.(null, { status, ...props }));
  const pause = useEventCallback(() => setRunning(false));
  const play = useEventCallback(() => {
    if (imperativePauseRef.current) {
      return;
    }
    const containsActive = !!toastRef.current?.contains(targetDocument?.activeElement ?? null);
    if (timerTimeout < 0) {
      setRunning(true);
      return;
    }

    if (!containsActive) {
      setRunning(true);
    }
  });

  const { findFirstFocusable } = useFocusFinders();

  React.useImperativeHandle(imperativeRef, () => ({
    focus: () => {
      if (!toastRef.current) {
        return;
      }

      const firstFocusable = findFirstFocusable(toastRef.current);
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        toastRef.current.focus();
      }
    },

    play: () => {
      imperativePauseRef.current = false;
      play();
    },
    pause: () => {
      imperativePauseRef.current = true;
      pause();
    },
  }));

  React.useEffect(() => {
    return () => onStatusChange('unmounted');
  }, [onStatusChange]);

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

  // Using a ref callback here because addEventListener supports `once`
  const toastAnimationRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      if (el && toastRef.current) {
        el.style.setProperty('--fui-toast-height', `${el.scrollHeight}px`);
        el.addEventListener(
          'animationend',
          () => {
            // start toast once it's fully animated in
            play();
            onStatusChange('visible');
          },
          { once: true },
        );
      }
    },
    [play, onStatusChange],
  );

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    pause();
    userRootSlot?.onMouseEnter?.(e);
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    play();
    userRootSlot?.onMouseEnter?.(e);
  });

  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }

    userRootSlot?.onKeyDown?.(e);
  });

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    const politeness = desiredPoliteness ?? intentPolitenessMap[intent];
    announce(toastRef.current?.textContent ?? '', { politeness });
  }, [announce, desiredPoliteness, toastRef, visible, updateId, intent]);

  React.useEffect(() => {
    return () => {
      if (focusedToastBeforeClose.current) {
        focusedToastBeforeClose.current = false;
        tryRestoreFocus();
      }
    };
  }, [tryRestoreFocus]);

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
      ref: useMergedRefs(ref, toastRef, toastAnimationRef, toastMotionRef),
      children,
      tabIndex: -1,
      role: 'group',
      'aria-labelledby': titleId,
      'aria-describedby': bodyId,
      ...rest,
      ...userRootSlot,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
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
    titleId,
    bodyId,
    shouldRender,
    motionVisible,
  };
};
