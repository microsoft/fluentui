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

      return {
        set playbackRate(rate: number) {
          animations.forEach(animation => {
            animation.playbackRate = rate;
          });
        },
        setMotionEndCallbacks(onfinish: () => void, oncancel: () => void) {
          // Heads up!
          // This could use "Animation:finished", but it's causing a memory leak in Chromium.
          // See: https://issues.chromium.org/u/2/issues/383016426
          const promises = animations.map(animation => {
            return new Promise<void>((resolve, reject) => {
              animation.onfinish = () => resolve();
              animation.oncancel = () => reject();
            });
          });

          Promise.all(promises)
            .then(() => {
              onfinish();
            })
            .catch(() => {
              oncancel();
            });
        },
        isRunning() {
          return animations.some(animation => isAnimationRunning(animation));
        },

        cancel: () => {
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

        set playbackRate(rate: number) {
          /* no-op */
        },
        isRunning() {
          return false;
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
  'use no memo';

  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAnimateAtomsInTestEnvironment();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAnimateAtomsInSupportedEnvironment();
}
