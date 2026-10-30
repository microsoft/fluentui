'use client';

import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { UsePositioningOptions } from './types';
import { applyVisibility, debounce, updatePlacementAttribute } from './utils';

type PlacementObserverOptions = Pick<
  UsePositioningOptions,
  'coverTarget' | 'disableUpdateOnResize' | 'onPositioningEnd'
>;

/**
 * Used with CSS anchor positioning. Mirrors the placement that the browser actually resolves for an anchored element
 * into its `data-placement` attribute, useful when `position-try-fallbacks` flips the container after a layout shift,
 * scroll, or content reflow. Also sets the hidden and escaped attributes and calls `onPositioningEnd`.
 *
 * Pass `null` elements to stop observing.
 */
export function usePlacementObserver(
  containerEl: HTMLElement | null,
  targetEl: HTMLElement | null,
  options: PlacementObserverOptions,
): () => void {
  const { coverTarget, disableUpdateOnResize, onPositioningEnd } = options;

  const update = useEventCallback(() => {
    const win = containerEl?.ownerDocument.defaultView;

    if (!containerEl || !targetEl || !win) {
      return;
    }

    // The placement can't be detected when the container covers the target
    const placement = coverTarget ? null : updatePlacementAttribute(targetEl, containerEl);
    const rtl = win.getComputedStyle(containerEl).direction === 'rtl';

    applyVisibility(containerEl, targetEl, placement, rtl, onPositioningEnd);
  });

  useIsomorphicLayoutEffect(() => {
    const win = containerEl?.ownerDocument.defaultView;

    if (!containerEl || !targetEl || !win) {
      return;
    }

    const debouncedUpdate = debounce(update);
    const resizeObserver =
      disableUpdateOnResize || !win.ResizeObserver
        ? null
        : new win.ResizeObserver(entries => {
            // `display: none` is very likely being used to hide the element, users update it imperatively
            if (entries.every(entry => entry.contentRect.width > 0 && entry.contentRect.height > 0)) {
              debouncedUpdate();
            }
          });

    resizeObserver?.observe(containerEl);
    resizeObserver?.observe(targetEl);
    // `scroll` doesn't bubble, capturing it covers every scrollable ancestor
    win.addEventListener('scroll', debouncedUpdate, { capture: true, passive: true });
    win.addEventListener('resize', debouncedUpdate);

    debouncedUpdate();

    return () => {
      resizeObserver?.disconnect();
      win.removeEventListener('scroll', debouncedUpdate, { capture: true });
      win.removeEventListener('resize', debouncedUpdate);
    };
  }, [containerEl, targetEl, disableUpdateOnResize, update]);

  return update;
}
