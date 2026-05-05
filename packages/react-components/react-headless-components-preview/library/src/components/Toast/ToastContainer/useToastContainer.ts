'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { ToastContainerProps, ToastContainerState } from './ToastContainer.types';

type PopoverElement = HTMLDivElement & {
  showPopover?: () => void;
  hidePopover?: () => void;
};

export const useToastContainer = (props: ToastContainerProps, ref: React.Ref<HTMLElement>): ToastContainerState => {
  const {
    visible,
    close: stateClose,
    remove,
    intent,
    timeout: timeoutProp = -1,
    pauseOnHover = false,
    pauseOnWindowBlur = false,
    imperativeRef,
    tryRestoreFocus,
    onStatusChange,
    // State machine fields — destructured to keep them out of ...rest (not passed to the DOM).
    content: _content,
    toastId: _toastId,
    toasterId: _toasterId,
    position: _position,
    order: _order,
    updateId: _updateId,
    priority: _priority,
    politeness: _politeness,
    data: _data,
    ...rest
  } = props;

  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  const toastRef = React.useRef<PopoverElement>(null);
  const mergedRef = useMergedRefs(ref, toastRef) as React.Ref<HTMLDivElement>;
  const titleId = useId('toast-title-');
  const bodyId = useId('toast-body-');

  const [running, setRunning] = React.useState(false);
  // Tracks whether pause() was called via the imperative ref (as opposed to hover/blur).
  const imperativePauseRef = React.useRef(false);
  // Tracks whether focus was inside the toast at the time it closed (for focus restoration).
  const focusedBeforeCloseRef = React.useRef(false);

  const close = useEventCallback(() => {
    const activeEl = targetDocument?.activeElement;
    if (activeEl && toastRef.current?.contains(activeEl)) {
      focusedBeforeCloseRef.current = true;
    }
    stateClose();
  });

  const play = useEventCallback(() => {
    if (imperativePauseRef.current || timeoutProp < 0) {
      return;
    }
    const containsActive = !!toastRef.current?.contains(targetDocument?.activeElement ?? null);
    if (!containsActive) {
      setRunning(true);
    }
  });

  const pause = useEventCallback(() => setRunning(false));

  // Expose imperative focus/pause/play to the state machine.
  React.useImperativeHandle(imperativeRef, () => ({
    focus: () => toastRef.current?.focus(),
    play: () => {
      imperativePauseRef.current = false;
      play();
    },
    pause: () => {
      imperativePauseRef.current = true;
      pause();
    },
  }));

  // Auto-dismiss timer. Uses targetDocument's window so timers are scoped to the
  // correct browsing context (e.g. iframes), matching the project's no-globals rule.
  React.useEffect(() => {
    if (!running || !win || timeoutProp < 0) {
      return;
    }
    const id = win.setTimeout(() => {
      close();
      setRunning(false);
    }, timeoutProp);
    return () => win.clearTimeout(id);
  }, [running, win, timeoutProp, close]);

  // Drive the Popover API from the state machine's visible flag.
  // useIsomorphicLayoutEffect prevents a paint where the element is in the DOM
  // but not yet in the top layer.
  useIsomorphicLayoutEffect(() => {
    const el = toastRef.current;
    if (!el || !('showPopover' in el)) {
      return;
    }

    if (visible) {
      if (!el.matches(':popover-open')) {
        el.showPopover!();
        play(); // start the auto-dismiss timer as soon as the toast appears
      }
    } else {
      if (el.matches(':popover-open')) {
        el.hidePopover!();
      }
    }
  }, [visible, play]);

  // Remove the toast from the state machine once it's no longer visible.
  // Without animation, removal is immediate after hide (replaces CollapseDelayed exit callback).
  React.useEffect(() => {
    if (!visible) {
      remove();
    }
  }, [visible, remove]);

  // Report 'unmounted' lifecycle status when the component is destroyed.
  const reportStatus = useEventCallback(() => onStatusChange?.(null, { status: 'unmounted', ...props }));
  React.useEffect(() => reportStatus, [reportStatus]);

  // Restore focus when the toast that had focus is closed.
  React.useEffect(() => {
    return () => {
      if (focusedBeforeCloseRef.current) {
        focusedBeforeCloseRef.current = false;
        tryRestoreFocus();
      }
    };
  }, [tryRestoreFocus]);

  const onMouseEnter = useEventCallback(() => {
    if (pauseOnHover) {
      pause();
    }
  });

  const onMouseLeave = useEventCallback(() => {
    if (pauseOnHover) {
      play();
    }
  });

  // Pause/resume when the browser window loses/regains focus.
  React.useEffect(() => {
    if (!pauseOnWindowBlur || !win) {
      return;
    }
    win.addEventListener('focus', play);
    win.addEventListener('blur', pause);
    return () => {
      win.removeEventListener('focus', play);
      win.removeEventListener('blur', pause);
    };
  }, [pauseOnWindowBlur, win, play, pause]);

  const role = intent === 'error' || intent === 'warning' ? 'alert' : 'status';

  return {
    components: { root: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // popover="manual": top-layer placement with no light-dismiss.
        // Only explicit close() or timeout dismisses the toast.
        ...({ popover: 'manual' } as {}),
        ref: mergedRef,
        role,
        tabIndex: -1,
        'aria-labelledby': titleId,
        'aria-describedby': bodyId,
        onMouseEnter,
        onMouseLeave,
        ...rest,
      }),
      { elementType: 'div' },
    ),
    intent,
    bodyId,
    titleId,
    close,
  };
};
