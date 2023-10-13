import * as React from 'react';
import {
  getIntrinsicElementProps,
  useMergedRefs,
  ExtractSlotProps,
  Slot,
  useEventCallback,
  useId,
  slot,
} from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { Delete, Tab } from '@fluentui/keyboard-keys';
import { useFocusableGroup, useFocusFinders } from '@fluentui/react-tabster';
import { ToastStatus } from '../../state';
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
  const focusableGroupAttribute = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
    // Users should only use Tab to focus into the toast
    // Escape is already reserved to dismiss all toasts
    ignoreDefaultKeydown: { Tab: true, Escape: true, Enter: true },
  });

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

  React.useImperativeHandle(imperativeRef, () => ({
    focus: () => {
      if (!toastRef.current) {
        return;
      }

      toastRef.current.focus();
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
        toastRef.current.addEventListener(
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

  const { findFirstFocusable, findLastFocusable } = useFocusFinders();
  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === Delete) {
      e.preventDefault();
      close();
    }

    if (e.key === Tab && e.currentTarget === e.target) {
      e.preventDefault();
      if (e.shiftKey) {
        findLastFocusable(e.currentTarget)?.focus();
      } else {
        findFirstFocusable(e.currentTarget)?.focus();
      }
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
    timer: slot.always<TimerProps>(
      { key: updateId, onTimeout: close, running, timeout: timerTimeout ?? -1 },
      { elementType: Timer },
    ),
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, toastRef, toastAnimationRef) as React.Ref<HTMLDivElement>,
        children,
        tabIndex: 0,
        role: 'listitem',
        'aria-labelledby': titleId,
        'aria-describedby': bodyId,
        ...rest,
        ...userRootSlot,
        ...focusableGroupAttribute,
        onMouseEnter,
        onMouseLeave,
        onKeyDown,
      }),
      { elementType: 'div' },
    ),
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
  };
};
