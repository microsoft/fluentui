'use client';

import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';

export type UsePausableTimerOptions = {
  /**
   * Total timer duration in milliseconds. A negative value disables the timer.
   */
  timeout: number;
  /**
   * Whether the timer is currently counting down. Toggling preserves elapsed time.
   */
  running: boolean;
  /**
   * Called when the timer naturally elapses while running.
   */
  onTimeout: () => void;
  /**
   * Changing this value resets the timer, discarding elapsed time.
   */
  resetKey?: unknown;
};

/**
 * A pausable countdown timer backed by the Web Animations API.
 *
 * The native `Animation.pause()` / `Animation.play()` semantics preserve elapsed
 * time across pause/resume — equivalent to a CSS animation's `animation-play-state`,
 * but without any DOM node or stylesheet. This matches the original `react-toast`
 * `<Timer>` behavior, where hovering doesn't restart the countdown.
 */
export const usePausableTimer = ({ timeout, running, onTimeout, resetKey }: UsePausableTimerOptions): void => {
  const { targetDocument } = useFluent_unstable();
  const animationRef = React.useRef<Animation | null>(null);
  const handleTimeout = useEventCallback(onTimeout);

  React.useEffect(() => {
    if (timeout < 0 || !targetDocument?.defaultView?.Animation) {
      return;
    }

    const animation = new targetDocument.defaultView.Animation(
      new targetDocument.defaultView.KeyframeEffect(null, null, timeout),
      targetDocument.timeline,
    );
    animation.onfinish = handleTimeout;
    animationRef.current = animation;

    return () => {
      animation.onfinish = null;
      animation.cancel();
      animationRef.current = null;
    };
  }, [timeout, targetDocument, handleTimeout, resetKey]);

  React.useEffect(() => {
    const animation = animationRef.current;
    if (!animation) {
      return;
    }
    if (running) {
      animation.play();
    } else {
      animation.pause();
    }
  }, [running, resetKey]);
};
