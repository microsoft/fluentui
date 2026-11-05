// @ts-check

/** @type {import("@fluentui/react-storybook-addon").FluentParameters} */
export const parameters = {
  layout: 'none',
  mode: 'vr-test',
  reactStorybookAddon: {
    disabledDecorators: ['AriaLive'],
  },
};

disableWebAnimations();

/**
 * Screenshots must not depend on when they are captured. storywright zeroes CSS animation and transition durations,
 * but that does not affect the Web Animations API used by `@fluentui/react-motion`, so motions are settled here:
 * finite animations jump to their end state and infinite ones are frozen half-way through their first iteration.
 */
function disableWebAnimations() {
  if (typeof Element === 'undefined' || typeof Element.prototype.animate !== 'function') {
    return;
  }

  const animate = Element.prototype.animate;

  /** @type {typeof Element.prototype.animate} */
  Element.prototype.animate = function (keyframes, options) {
    const animation = animate.call(this, keyframes, options);

    // Callers attach finish handlers right after animate() returns (e.g. Toast becomes visible on enter finish),
    // so settle the animation only once they had a chance to do that.
    queueMicrotask(() => settleAnimation(animation));

    return animation;
  };
}

/**
 * @param {Animation | null} animation
 */
function settleAnimation(animation) {
  // Chromium can return null from animate(), see https://github.com/microsoft/fluentui/issues/33902
  const timing = animation?.effect?.getComputedTiming();

  // An idle animation was cancelled by its owner already, finishing it would apply stale keyframes
  if (!animation || !timing || animation.playState === 'idle') {
    return;
  }

  if (timing.endTime === Infinity) {
    animation.pause();
    animation.currentTime = Number(timing.delay ?? 0) + Number(timing.duration ?? 0) / 2;
  } else {
    animation.finish();
  }
}
