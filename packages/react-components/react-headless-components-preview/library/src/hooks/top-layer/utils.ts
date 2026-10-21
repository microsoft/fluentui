export const log = (level: 'warn' | 'error', message: string): void => {
  // eslint-disable-next-line no-console
  console[level](`@fluentui/react-headless-components-preview [top layer]: ${message}`);
};

export const isDialogElement = (element: Element | null | undefined): element is HTMLDialogElement =>
  !!element && typeof (element as HTMLDialogElement).showModal === 'function';

/**
 * Falls back to the class `@oddbird/popover-polyfill` sets where `:popover-open` is unsupported (jsdom, old engines).
 */
export const isPopoverOpen = (element: Element): boolean => {
  try {
    return element.matches(':popover-open');
  } catch {
    return element.classList.contains(':popover-open');
  }
};

export const isInTopLayer = (element: HTMLElement): boolean =>
  (isDialogElement(element) && element.open) || isPopoverOpen(element);

/**
 * Whether a `<dialog>` is open modally, not through `show()`. Falls back to `open` where `:modal` is unsupported
 * (jsdom).
 */
export const isModal = (element: HTMLDialogElement): boolean => {
  try {
    return element.matches(':modal');
  } catch {
    return element.open;
  }
};

/**
 * Calls `onFinished` once the finite animations on the element and its pseudo-elements (`::backdrop`, `::before`,
 * `::after`) end, or right away when none run. Animations on descendants are ignored. Returns a cancel function.
 */
export const waitForAnimations = (element: HTMLElement, onFinished: () => void): (() => void) => {
  const animations = (element.getAnimations?.({ subtree: true }) ?? []).filter(animation => {
    const effect = animation.effect;
    return (
      effect &&
      'target' in effect &&
      effect.target === element &&
      animation.playState === 'running' &&
      Number.isFinite(effect.getComputedTiming().endTime)
    );
  });

  if (animations.length === 0) {
    onFinished();
    return () => undefined;
  }

  let cancelled = false;
  let remaining = animations.length;
  const handleAnimationFinished = () => {
    if (!cancelled && --remaining === 0) {
      onFinished();
    }
  };
  animations.forEach(animation => {
    animation.finished.then(handleAnimationFinished, handleAnimationFinished);
  });

  return () => {
    cancelled = true;
  };
};
