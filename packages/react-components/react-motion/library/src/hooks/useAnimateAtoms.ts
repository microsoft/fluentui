'use client';

import * as React from 'react';

import { isAnimationRunning } from '../utils/isAnimationRunning';
import type { AnimationHandle, AtomMotion } from '../types';

export const DEFAULT_ANIMATION_OPTIONS: KeyframeEffectOptions = {
  fill: 'forwards',
};

// A motion atom's default reduced motion is a simple 1 ms duration.
// But an atom can define a custom reduced motion, overriding keyframes and/or params like duration, easing, iterations, etc.
const DEFAULT_REDUCED_MOTION_ATOM: NonNullable<AtomMotion['reducedMotion']> = {
  duration: 1,
};

/**
 * Creates an animation handle that controls multiple animations.
 * Is used to avoid leaking "element" references from the hook.
 *
 * @param animations
 */
function createHandle(animations: Animation[]): AnimationHandle {
  let onfinish: (() => void) | undefined;
  let oncancel: (() => void) | undefined;
  let isSettled = true;
  let callbackGeneration = 0;
  let cancelDrainRemaining = 0;
  let pendingReplay: (() => void) | undefined;
  let isDisposed = false;

  const setAnimationEndCallbacks = (generation: number) => {
    let finishedAnimations = 0;

    animations.forEach(animation => {
      animation.onfinish = () => {
        if (generation !== callbackGeneration || animation.playState === 'running') {
          return;
        }

        finishedAnimations++;

        if (!isSettled && finishedAnimations === animations.length) {
          isSettled = true;
          onfinish?.();
        }
      };
      animation.oncancel = () => {
        if (generation !== callbackGeneration || animation.playState !== 'idle') {
          return;
        }

        if (!isSettled) {
          isSettled = true;
          oncancel?.();
        }
      };
    });
  };

  return {
    set playbackRate(rate: number) {
      animations.forEach(animation => {
        animation.playbackRate = rate;
      });
    },
    setMotionEndCallbacks(nextOnfinish: () => void, nextOncancel: () => void) {
      // Heads up!
      // This could use "Animation.finished", but it causes a memory leak in Chromium.
      // See: https://issues.chromium.org/u/2/issues/383016426
      onfinish = nextOnfinish;
      oncancel = nextOncancel;
      isSettled = false;
      const generation = ++callbackGeneration;
      setAnimationEndCallbacks(generation);

      if (animations.length === 0) {
        Promise.resolve().then(() => {
          if (!isDisposed && generation === callbackGeneration && !isSettled) {
            isSettled = true;
            onfinish?.();
          }
        });
      }
    },
    replay(onReplay: () => void) {
      pendingReplay = onReplay;

      const completeReplay = () => {
        cancelDrainRemaining = 0;

        if (isDisposed || !pendingReplay) {
          return;
        }

        const replayCallback = pendingReplay;

        if (!isSettled) {
          isSettled = true;
          oncancel?.();
        }

        if (isDisposed || pendingReplay !== replayCallback) {
          return;
        }

        pendingReplay = undefined;
        animations.forEach(animation => animation.play());
        replayCallback();
      };

      if (cancelDrainRemaining > 0) {
        return;
      }

      cancelDrainRemaining = animations.filter(animation => animation.playState !== 'idle').length;

      if (cancelDrainRemaining === 0) {
        animations.forEach(animation => animation.cancel());
        completeReplay();
        return;
      }

      animations.forEach(animation => {
        if (animation.playState === 'idle') {
          animation.cancel();
          return;
        }

        animation.oncancel = () => {
          if (cancelDrainRemaining === 0) {
            return;
          }

          cancelDrainRemaining--;

          if (cancelDrainRemaining === 0) {
            completeReplay();
          }
        };
        animation.cancel();
      });
    },
    isRunning() {
      return animations.some(animation => isAnimationRunning(animation));
    },

    dispose: () => {
      isDisposed = true;
      callbackGeneration++;
      cancelDrainRemaining = 0;
      pendingReplay = undefined;
      onfinish = undefined;
      oncancel = undefined;
      isSettled = true;
      animations.length = 0;
    },

    cancel: () => {
      pendingReplay = undefined;
      cancelDrainRemaining = 0;
      callbackGeneration++;

      if (!isSettled) {
        isSettled = true;
        oncancel?.();
      }

      animations.forEach(animation => {
        animation.cancel();
      });
    },
    pause: () => {
      animations.forEach(animation => {
        animation.pause();
      });
    },
    play: () => {
      pendingReplay = undefined;
      cancelDrainRemaining = 0;
      animations.forEach(animation => {
        animation.play();
      });
    },
    finish: () => {
      animations.forEach(animation => {
        animation.finish();
      });
    },
    reverse: () => {
      // Heads up!
      //
      // This is used for the interruptible motion. If the animation is running, we need to reverse it.
      //
      // TODO: what do with animations that have "delay"?
      // TODO: what do with animations that have different "durations"?

      animations.forEach(animation => {
        animation.reverse();
      });
    },
  };
}

function useAnimateAtomsInSupportedEnvironment() {
  // eslint-disable-next-line @nx/workspace-no-restricted-globals
  const SUPPORTS_PERSIST = typeof window !== 'undefined' && typeof window.Animation?.prototype.persist === 'function';

  return React.useCallback(
    (
      element: HTMLElement,
      value: AtomMotion | AtomMotion[],
      options: {
        isReducedMotion: boolean;
      },
    ): AnimationHandle => {
      const atoms = Array.isArray(value) ? value : [value];
      const { isReducedMotion } = options;

      const animations = atoms
        .map(motion => {
          // Grab the custom reduced motion definition if it exists, or fall back to the default reduced motion.
          const { keyframes: motionKeyframes, reducedMotion = DEFAULT_REDUCED_MOTION_ATOM, ...params } = motion;
          // Grab the reduced motion keyframes if they exist, or fall back to the regular keyframes.
          const { keyframes: reducedMotionKeyframes = motionKeyframes, ...reducedMotionParams } = reducedMotion;

          const animationKeyframes: Keyframe[] = isReducedMotion ? reducedMotionKeyframes : motionKeyframes;
          const animationParams: KeyframeEffectOptions = {
            ...DEFAULT_ANIMATION_OPTIONS,
            ...params,

            // Use reduced motion overrides (e.g. duration, easing) when reduced motion is enabled
            ...(isReducedMotion && reducedMotionParams),
          };

          try {
            // Firefox can throw an error when calling `element.animate()`.
            // See: https://github.com/microsoft/fluentui/issues/33902
            const animation = element.animate(animationKeyframes, animationParams);

            if (SUPPORTS_PERSIST) {
              // Chromium browsers can return null when calling `element.animate()`.
              // See: https://github.com/microsoft/fluentui/issues/33902
              animation?.persist();
            } else {
              const resultKeyframe = animationKeyframes[animationKeyframes.length - 1];
              Object.assign(element.style ?? {}, resultKeyframe);
            }

            return animation;
          } catch (e) {
            return null;
          }
        })
        .filter(animation => !!animation) as Animation[];

      return createHandle(animations);
    },
    [SUPPORTS_PERSIST],
  );
}

/**
 * In test environments, this hook is used to delay the execution of a callback until the next render. This is necessary
 * to ensure that the callback is not executed synchronously, which would cause the test to fail.
 *
 * @see https://github.com/microsoft/fluentui/issues/31701
 */
function useAnimateAtomsInTestEnvironment() {
  const [count, setCount] = React.useState(0);
  const callbackRef = React.useRef<() => void>(undefined);

  const realAnimateAtoms = useAnimateAtomsInSupportedEnvironment();

  React.useEffect(() => {
    if (count > 0) {
      callbackRef.current?.();
    }
  }, [count]);

  return React.useCallback(
    (
      element: HTMLElement,
      value: AtomMotion | AtomMotion[],
      options: {
        isReducedMotion: boolean;
      },
    ): AnimationHandle => {
      const ELEMENT_SUPPORTS_WEB_ANIMATIONS = typeof element.animate === 'function';

      // Heads up!
      // If the environment supports Web Animations API, we can use the native implementation.
      if (ELEMENT_SUPPORTS_WEB_ANIMATIONS) {
        return realAnimateAtoms(element, value, options);
      }

      return {
        setMotionEndCallbacks(onfinish: () => void) {
          callbackRef.current = onfinish;
          setCount(v => v + 1);
        },
        replay(onReplay: () => void) {
          onReplay();
        },

        set playbackRate(rate: number) {
          /* no-op */
        },
        isRunning() {
          return false;
        },

        dispose() {
          /* no-op */
        },

        cancel() {
          /* no-op */
        },
        pause() {
          /* no-op */
        },
        play() {
          /* no-op */
        },
        finish() {
          /* no-op */
        },
        reverse() {
          /* no-op */
        },
      };
    },
    [realAnimateAtoms],
  );
}

/**
 * @internal
 */
export function useAnimateAtoms(): (
  element: HTMLElement,
  value: AtomMotion | AtomMotion[],
  options: { isReducedMotion: boolean },
) => AnimationHandle {
  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAnimateAtomsInTestEnvironment();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAnimateAtomsInSupportedEnvironment();
}
