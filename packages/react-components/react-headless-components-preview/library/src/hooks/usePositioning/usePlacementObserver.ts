'use client';

import { useIsomorphicLayoutEffect, useEventCallback } from '@fluentui/react-utilities';
import { computePosition, debounce, isRendered } from './utils';

/**
 * Mirrors the placement that the browser actually resolves for an
 * anchored element into its `data-placement` attribute. Useful when CSS
 * `position-try-fallbacks` flips the surface after a layout shift, scroll,
 * or content reflow — consumers can style the surface (arrows, animations)
 * via `[data-placement^="above"]` and friends and stay in sync.
 *
 * The surface counts as hidden only when it is not rendered (no client rects, e.g.
 * `display: none` on a closed popover); `visibility: hidden`, `opacity: 0` or
 * `scale(0)` still count as laid out. While hidden only a ResizeObserver stays
 * attached; window listeners attach when the surface is laid out. Without
 * ResizeObserver (test DOMs such as jsdom) the observer does nothing.
 */
export function usePlacementObserver(
  containerEl: HTMLElement | null,
  targetEl: HTMLElement | null,
  targetDocument: Document | undefined,
  disabled = false,
): () => void {
  const update = useEventCallback(() => {
    if (!containerEl || !targetEl) {
      return;
    }

    const result = computePosition(targetEl, containerEl);
    if (!result) {
      return;
    }

    if (containerEl.getAttribute('data-placement') !== result.placement) {
      containerEl.setAttribute('data-placement', result.placement);
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (disabled || !containerEl || !targetEl) {
      return;
    }

    const win = targetDocument?.defaultView;
    const ResizeObserverCtor = win?.ResizeObserver;
    if (!win || !ResizeObserverCtor) {
      return;
    }

    const debouncedUpdate = debounce(update);

    let listening = false;

    const startListening = () => {
      if (listening) {
        return;
      }
      listening = true;
      win.addEventListener('scroll', debouncedUpdate, { capture: true, passive: true });
      win.addEventListener('resize', debouncedUpdate);
    };

    const stopListening = () => {
      if (!listening) {
        return;
      }
      listening = false;
      win.removeEventListener('scroll', debouncedUpdate, { capture: true });
      win.removeEventListener('resize', debouncedUpdate);
    };

    const resizeObserver = new ResizeObserverCtor(() => {
      if (isRendered(containerEl)) {
        startListening();
        debouncedUpdate();
      } else {
        stopListening();
      }
    });

    resizeObserver.observe(containerEl, { box: 'border-box' });
    resizeObserver.observe(targetEl);

    return () => {
      resizeObserver.disconnect();
      stopListening();
    };
  }, [containerEl, targetEl, targetDocument, disabled, update]);

  return update;
}
