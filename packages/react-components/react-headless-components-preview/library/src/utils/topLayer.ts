export type ToggleEvent = Event & { newState?: 'open' | 'closed'; oldState?: 'open' | 'closed' };

/**
 * The focused element in the element's own root. Inside a shadow root, `document.activeElement` is only the host.
 */
export const getActiveElement = (element: Element): Element | null => {
  const root = element.getRootNode();
  const ShadowRootConstructor = element.ownerDocument.defaultView?.ShadowRoot;
  const shadowActiveElement =
    ShadowRootConstructor && root instanceof ShadowRootConstructor ? root.activeElement : null;
  return shadowActiveElement ?? element.ownerDocument.activeElement;
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
 * The popover mode the browser applies. Reads the `popover` property, because unsupported `hint` keeps the attribute
 * but acts as `manual`. Falls back to the attribute where the property is missing.
 */
export const getPopoverMode = (element: Element): string | null =>
  (element as HTMLElement & { popover?: string | null }).popover ?? element.getAttribute('popover');

/**
 * Whether an open `auto` or `hint` popover inside the element would take Escape first.
 */
export const hasOpenNestedPopover = (element: HTMLElement): boolean =>
  Array.from(element.querySelectorAll('[popover]')).some(
    nested => getPopoverMode(nested) !== 'manual' && isPopoverOpen(nested),
  );

/**
 * Whether Escape pressed on `target` is for `layer`. Not when it comes from another layer inside it, or when an open
 * `auto` or `hint` popover inside it takes Escape first, like the browser closes the topmost layer. Content portaled out
 * of `layer` still counts.
 */
export const isEscapeForLayer = (layer: HTMLElement, target: Element): boolean => {
  const targetLayer = target.closest('[popover], dialog');
  return (!targetLayer || targetLayer === layer) && !hasOpenNestedPopover(layer);
};

const hintSupport = new WeakMap<Document, boolean>();

/**
 * Whether the document supports `popover="hint"`. Cached per document.
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
