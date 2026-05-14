'use client';

import { useIsomorphicLayoutEffect, useEventCallback } from '@fluentui/react-utilities';
import { computePosition, debounce } from './utils';

/**
 * Mirrors the placement that the browser actually resolves for an
 * anchored element into its `data-placement` attribute. Useful when CSS
 * `position-try-fallbacks` flips the surface after a layout shift, scroll,
 * or content reflow — consumers can style the surface (arrows, animations)
 * via `[data-placement^="above"]` and friends and stay in sync.
 *
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
    if (!win) {
      return;
    }

    const debouncedUpdate = debounce(update);

    const ResizeObserverCtor = win.ResizeObserver;
    const resizeObserver = ResizeObserverCtor
      ? new ResizeObserverCtor(entries => {
          const allLaidOut = entries.every(entry => entry.contentRect.width > 0 && entry.contentRect.height > 0);
          if (allLaidOut) {
            debouncedUpdate();
          }
        })
      : null;

    resizeObserver?.observe(containerEl);
    resizeObserver?.observe(targetEl);

    win.addEventListener('scroll', debouncedUpdate, { capture: true, passive: true });
    win.addEventListener('resize', debouncedUpdate);

    debouncedUpdate();

    return () => {
      resizeObserver?.disconnect();
      win.removeEventListener('scroll', debouncedUpdate, { capture: true });
      win.removeEventListener('resize', debouncedUpdate);
    };
  }, [containerEl, targetEl, targetDocument, disabled, update]);

  return update;
}
