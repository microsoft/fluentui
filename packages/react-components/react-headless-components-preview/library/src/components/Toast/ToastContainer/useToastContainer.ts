'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { Delete } from '@fluentui/keyboard-keys';
import type { ToastPoliteness, ToastStatus } from '@fluentui/react-toast';
import type { ToastContainerProps, ToastContainerState } from './ToastContainer.types';

const intentPolitenessMap: Record<NonNullable<ToastContainerProps['intent']>, ToastPoliteness> = {
  success: 'assertive',
  warning: 'assertive',
  error: 'assertive',
  info: 'polite',
};

/**
 * The `useToastContainer` hook processes the props sent to `ToastContainer` and returns state and slot props.
 */
export const useToastContainer = (props: ToastContainerProps, ref: React.Ref<HTMLElement>): ToastContainerState => {
  const {
    visible,
    children,
    close: closeProp,
    remove,
    updateId,
    onStatusChange,
    data,
    timeout: timerTimeout = -1,
    intent = 'info',
    politeness,
    pauseOnHover,
    pauseOnWindowBlur,
    imperativeRef,
    tryRestoreFocus,
    announce,
    content: _content,
    ...rest
  } = props;

  const titleId = useId('toast-title');
  const bodyId = useId('toast-body');
  const toastRef = React.useRef<HTMLDivElement | null>(null);
  const { targetDocument } = useFluent_unstable();
  const [running, setRunning] = React.useState(false);
  const imperativePauseRef = React.useRef(false);
  const focusedToastBeforeClose = React.useRef(false);

  const close = useEventCallback(() => {
    const activeElement = targetDocument?.activeElement;
    if (activeElement && toastRef.current?.contains(activeElement)) {
      focusedToastBeforeClose.current = true;
    }

    closeProp();
  });

  const reportStatus = useEventCallback((status: ToastStatus) => onStatusChange?.(null, { status, ...props }));
  const pause = useEventCallback(() => setRunning(false));
  const play = useEventCallback(() => {
    if (imperativePauseRef.current) {
      return;
    }

    if (timerTimeout < 0) {
      setRunning(true);
      return;
    }

    const activeElement = targetDocument?.activeElement;
    const containsActive = !!(activeElement && toastRef.current?.contains(activeElement));
    if (!containsActive) {
      setRunning(true);
    }
  });

  React.useImperativeHandle(imperativeRef, () => ({
    focus: () => {
      toastRef.current?.focus();
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
    return () => reportStatus('unmounted');
  }, [reportStatus]);

  React.useEffect(() => {
    if (!targetDocument || !pauseOnWindowBlur) {
      return;
    }

    targetDocument.defaultView?.addEventListener('focus', play);
    targetDocument.defaultView?.addEventListener('blur', pause);
    return () => {
      targetDocument.defaultView?.removeEventListener('focus', play);
      targetDocument.defaultView?.removeEventListener('blur', pause);
    };
  }, [targetDocument, pause, play, pauseOnWindowBlur]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    play();
    reportStatus('visible');
  }, [visible, play, reportStatus, updateId]);

  React.useEffect(() => {
    if (!running || timerTimeout < 0 || !targetDocument?.defaultView) {
      return;
    }

    const timeoutId = targetDocument.defaultView.setTimeout(close, timerTimeout);
    return () => targetDocument.defaultView?.clearTimeout(timeoutId);
  }, [running, timerTimeout, targetDocument, close]);

  React.useEffect(() => {
    if (!visible) {
      reportStatus('dismissed');
      remove();
    }
  }, [visible, remove, reportStatus]);

  React.useEffect(() => {
    return () => {
      if (focusedToastBeforeClose.current) {
        focusedToastBeforeClose.current = false;
        tryRestoreFocus();
      }
    };
  }, [tryRestoreFocus]);

  React.useEffect(() => {
    if (!visible || !announce) {
      return;
    }
    const resolvedPoliteness = politeness ?? intentPolitenessMap[intent];
    announce(toastRef.current?.textContent ?? '', { politeness: resolvedPoliteness });
  }, [announce, politeness, intent, visible, updateId]);

  const userRootSlot = (data as { root?: React.HTMLAttributes<HTMLDivElement> } | undefined)?.root;

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (pauseOnHover) {
      pause();
    }
    userRootSlot?.onMouseEnter?.(e);
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (pauseOnHover) {
      play();
    }
    userRootSlot?.onMouseLeave?.(e);
  });

  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === Delete) {
      e.preventDefault();
      close();
    }

    userRootSlot?.onKeyDown?.(e);
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, toastRef) as React.Ref<HTMLDivElement>,
        children,
        tabIndex: 0,
        role: 'listitem',
        'aria-labelledby': titleId,
        'aria-describedby': bodyId,
        ...rest,
        ...userRootSlot,
        onMouseEnter,
        onMouseLeave,
        onKeyDown,
      }),
      { elementType: 'div' },
    ),
    running,
    visible,
    remove,
    close,
    updateId,
    nodeRef: toastRef,
    intent,
    titleId,
    bodyId,
  };
};
