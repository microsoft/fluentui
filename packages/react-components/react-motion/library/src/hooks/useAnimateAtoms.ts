import * as React from 'react';
import type { AnimationHandle, AtomMotion } from '../types';

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

      const animations = atoms.map(motion => {
        const { keyframes, ...params } = motion;
        const animation = element.animate(keyframes, {
          fill: 'forwards',

          ...params,
          ...(isReducedMotion && { duration: 1 }),
        });

        if (SUPPORTS_PERSIST) {
          animation.persist();
        } else {
          const resultKeyframe = keyframes[keyframes.length - 1];
          Object.assign(element.style ?? {}, resultKeyframe);
        }

        return animation;
      });

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
  const callbackRef = React.useRef<() => void>();

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
      };
    },
    [realAnimateAtoms],
  );
}

/**
 * @internal
 */
export function useAnimateAtoms() {
  'use no memo';

  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAnimateAtomsInTestEnvironment();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAnimateAtomsInSupportedEnvironment();
}
