/**
 * Shared helpers for elements promoted into the browser top layer via the
 * HTML Popover API (`popover` attribute) or `HTMLDialogElement.showModal()`.
 */

export type ToggleEvent = Event & { newState?: 'open' | 'closed'; oldState?: 'open' | 'closed' };

export const isDialogElement = (element: Element | null | undefined): element is HTMLDialogElement =>
  !!element && typeof (element as HTMLDialogElement).showModal === 'function';

/**
 * Whether the element is currently shown as a popover.
 *
 * Falls back to the `:popover-open` class set by `@oddbird/popover-polyfill`
 * when the selector itself is unsupported (older engines, jsdom).
 */
export const isPopoverOpen = (element: Element): boolean => {
  try {
    return element.matches(':popover-open');
  } catch {
    return element.classList.contains(':popover-open');
  }
};

/**
 * Whether the element is currently rendered in the top layer, either as an open
 * popover or as an open `<dialog>`.
 */
export const isInTopLayer = (element: HTMLElement): boolean =>
  (isDialogElement(element) && element.open) || isPopoverOpen(element);

/**
 * Whether an `auto` or `hint` popover nested inside the element is open.
 * Escape and light dismiss close those first, before the element itself.
 */
export const hasOpenNestedPopover = (element: HTMLElement): boolean =>
  Array.from(element.querySelectorAll('[popover]')).some(
    nested => nested.getAttribute('popover') !== 'manual' && isPopoverOpen(nested),
  );

const hintSupport = new WeakMap<Document, boolean>();

/**
 * Whether the document supports `popover="hint"`. Unsupported values reflect as `manual`.
 */
export const supportsPopoverHint = (targetDocument: Document): boolean => {
  let supported = hintSupport.get(targetDocument);
  if (supported === undefined) {
    const probe = targetDocument.createElement('div');
    probe.setAttribute('popover', 'hint');
    supported = (probe as HTMLElement & { popover?: string | null }).popover === 'hint';
    hintSupport.set(targetDocument, supported);
  }
  return supported;
};

/**
 * Waits for running, finite animations on the element itself (including its
 * `::backdrop`) before calling `onFinished`. Animations on descendants are ignored.
 *
 * Calls `onFinished` synchronously when nothing is animating.
 *
 * @returns a cancel function that prevents `onFinished` from being called.
 */
export const waitForAnimations = (element: HTMLElement, onFinished: () => void): (() => void) => {
  // `subtree` includes pseudo-elements such as ::backdrop; filtering the target excludes child animations.
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
  // Cancellation rejects `finished`, but still completes the lifecycle.
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
