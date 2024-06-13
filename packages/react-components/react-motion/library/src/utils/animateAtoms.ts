import type { AnimationHandle, AtomMotion } from '../types';

export function animateAtoms(
  element: HTMLElement,
  value: AtomMotion | AtomMotion[],
  options: {
    isReducedMotion: boolean;
  },
): AnimationHandle {
  // Heads up!
  // Jest uses jsdom as the default environment, which doesn't support the Web Animations API. The same is true for
  // older browsers that are out of browser support matrix. In these cases, the animation will be a no-op.
  const SUPPORTS_WEB_ANIMATIONS = typeof element.animate === 'function';

  const atoms = Array.isArray(value) ? value : [value];
  const { isReducedMotion } = options;

  const animations = SUPPORTS_WEB_ANIMATIONS
    ? atoms.map(motion => {
        const { keyframes, ...params } = motion;
        const animation = element.animate(keyframes, {
          fill: 'forwards',

          ...params,
          ...(isReducedMotion && { duration: 1 }),
        });

        animation.persist();

        return animation;
      })
    : [];

  return {
    set playbackRate(rate: number) {
      animations.forEach(animation => {
        animation.playbackRate = rate;
      });
    },
    setMotionEndCallbacks(onfinish: () => void, oncancel: () => void) {
      // Heads up!
      // Jest uses jsdom as the default environment, which doesn't support the Web Animations API. This no-op is
      // necessary to avoid errors in tests.
      //
      // See https://github.com/microsoft/fluentui/issues/31593
      // See https://github.com/jsdom/jsdom/issues/3429
      if (process.env.NODE_ENV === 'test') {
        if (animations.length === 0) {
          onfinish();
          return;
        }
      }

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
}
