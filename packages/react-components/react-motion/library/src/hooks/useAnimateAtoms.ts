import * as React from 'react';
import type { AnimationHandle, AtomMotion } from '../types';

// Heads up! "Element." is a side-effect for minifiers, should be kept as IIFE to avoid leaking after minification.
const SUPPORTS_WEB_ANIMATIONS = /*@__PURE__*/ (() => typeof Element.prototype.animate === 'function')();

/**
 * In test environments, this hook is used to delay the execution of a callback until the next render. This is necessary
 * to ensure that the callback is not executed synchronously, which would cause the test to fail.
 *
 * @see https://github.com/microsoft/fluentui/issues/31701
 */
function useAnimateAtomsInTestEnvironment() {
  const [count, setCount] = React.useState(0);
  const callbackRef = React.useRef<() => void>();

  React.useEffect(() => {
    if (count > 0) {
      callbackRef.current?.();
    }
  }, [count]);

  return React.useCallback((): AnimationHandle => {
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
  }, []);
}

/**
 * @internal
 */
export function useAnimateAtoms() {
  'use no memo';

  if (process.env.NODE_ENV === 'test' && !SUPPORTS_WEB_ANIMATIONS) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAnimateAtomsInTestEnvironment();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
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

        animation.persist();

        return animation;
      });

      return {
        set playbackRate(rate: number) {
          animations.forEach(animation => {
            animation.playbackRate = rate;
          });
        },
        setMotionEndCallbacks(onfinish: () => void, oncancel: () => void) {
          Promise.all(animations.map(animation => animation.finished))
            .then(() => {
              onfinish();
            })
            .catch((err: unknown) => {
              const DOMException = element.ownerDocument.defaultView?.DOMException;

              // Ignores "DOMException: The user aborted a request" that appears if animations are cancelled
              if (DOMException && err instanceof DOMException && err.name === 'AbortError') {
                oncancel();
                return;
              }

              throw err;
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
    [],
  );
}
