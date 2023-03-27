import * as React from 'react';

type AnimationStateOptions = {
  /** Duration in milliseconds used both for enter and exit transitions. */
  duration: number;

  /** Duration in milliseconds used for enter transitions (overrides `duration` if provided). */
  enterDuration?: number;

  /** Duration in milliseconds used for exit transitions (overrides `duration` if provided). */
  exitDuration?: number;
};

const defaultDuration = 200;

export function useAnimationState(isPresent: boolean, options: AnimationStateOptions) {
  const { duration = defaultDuration, enterDuration = duration, exitDuration = duration } = options;

  const [mounted, setMounted] = React.useState(isPresent);
  const [visible, setVisible] = React.useState(false);
  const [entered, setEntered] = React.useState(false);

  const exiting = mounted && !isPresent;
  const entering = isPresent && !entered;
  const animating = entering || exiting;

  React.useEffect(() => {
    if (isPresent) {
      setMounted(true);
    } else {
      setEntered(false);
      setVisible(false);

      const timeoutId = setTimeout(() => setMounted(false), exitDuration);

      return () => clearTimeout(timeoutId);
    }
  }, [exitDuration, isPresent]);

  React.useEffect(() => {
    if (isPresent && mounted && !visible) {
      const animationFrameId = requestAnimationFrame(() => setVisible(true));

      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isPresent, mounted, visible]);

  React.useEffect(() => {
    if (visible && !entered) {
      const timeoutId = setTimeout(() => setEntered(true), enterDuration);

      return () => clearTimeout(timeoutId);
    }
  }, [enterDuration, entered, visible]);

  return {
    visible,
    mounted,
    animating,
    entering,
    exiting,
  };
}
