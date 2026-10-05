'use client';

import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { ExtendedPositioningProps, LogicalAlignment, PositioningTarget } from './types';
import type { FallbackInput, FallbackPlacement, FallbackRect } from './fallback/computeFallbackPosition';
import { computeFallbackPosition } from './fallback/computeFallbackPosition';
import { getContainingBlockElement, measureContainingBlock } from './fallback/containingBlock';
import type { PositioningPlugin, PositioningPluginContext } from './plugins/types';
import { POSITIONS } from './constants';
import { computePosition, debounce, getPlacementString, resolveOffset } from './utils';
import { normalizeAlign } from './utils/placement';
import { resolvePositioningShorthand } from '@fluentui/react-positioning';
import type { PositioningShorthandValue } from '@fluentui/react-positioning';

export interface PositionUpdatesOptions {
  options: ExtendedPositioningProps;
  plugins: readonly PositioningPlugin[];
  containerEl: HTMLElement | null;
  targetEl: PositioningTarget | null;
  arrowEl: HTMLElement | null;
  /** The position is computed in JavaScript, otherwise the browser does it with CSS */
  jsMode: boolean;
}

const toPlacement = (shorthand: PositioningShorthandValue): FallbackPlacement => {
  const { position = POSITIONS.above, align } = resolvePositioningShorthand(shorthand);
  return { position, align: normalizeAlign(align ?? 'center') };
};

const toRect = ({ left, top, width, height }: FallbackRect): FallbackRect => ({ left, top, width, height });

/**
 * Keeps the container positioned, and runs the plugins after every update. The container is positioned with CSS when
 * the browser supports it, otherwise it's done here in JavaScript using the same rules as CSS.
 */
export function usePositionUpdates(config: PositionUpdatesOptions): () => void {
  const update = useEventCallback(() => {
    const { options, plugins, containerEl: container, targetEl: target, arrowEl: arrow, jsMode } = config;
    const win = container?.ownerDocument.defaultView;

    if (!container || !target || !win) {
      return;
    }

    const { position = POSITIONS.above, strategy = 'fixed', coverTarget = false, matchTargetSize } = options;
    const align: LogicalAlignment = normalizeAlign(options.align ?? 'center');
    const containingBlock = getContainingBlockElement(container, strategy);
    const { bounds, originLeft, originTop } = measureContainingBlock(container, containingBlock, strategy);
    // Logical directions of `position-area` are the ones of the containing block
    const rtl = win.getComputedStyle(containingBlock ?? container.ownerDocument.documentElement).direction === 'rtl';
    const context: PositioningPluginContext = { options, container, target, arrow, rtl };
    const anchor = toRect(target.getBoundingClientRect());
    let placement: FallbackPlacement | null = null;
    // Where the container can be, plugins can change it
    let appliedBounds = bounds;

    if (jsMode) {
      const { mainAxis, crossAxis } = resolveOffset(options.offset);
      const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;
      const { fallbackPositions = [], pinned } = options;

      if (matchTargetSize === 'width') {
        container.style.setProperty('width', `${anchor.width}px`);
      }

      let input: FallbackInput = {
        anchor,
        bounds,
        width: container.offsetWidth,
        height: container.offsetHeight,
        rtl,
        placement: { position, align },
        fallbacks: fallbackPositions.length ? fallbackPositions.map(toPlacement) : undefined,
        pinned,
        coverTarget,
        marginBlock: isBlockMain ? mainAxis : crossAxis,
        marginInline: isBlockMain ? crossAxis : mainAxis,
      };

      plugins.forEach(plugin => {
        input = plugin.prepare?.(input, context) ?? input;
      });

      const result = computeFallbackPosition(input);
      placement = { position: result.position, align: result.align };
      appliedBounds = input.bounds;

      container.style.setProperty('left', `${result.left - originLeft}px`);
      container.style.setProperty('top', `${result.top - originTop}px`);
      container.setAttribute('data-placement', getPlacementString(result.position, result.align));
    } else if (!coverTarget && 'nodeType' in target) {
      // The browser picks the placement, it's detected from the rects
      const detected = computePosition(target, container);

      if (detected) {
        placement = { position: detected.position, align: detected.align };

        if (container.getAttribute('data-placement') !== detected.placement) {
          container.setAttribute('data-placement', detected.placement);
        }
      }
    }

    const popup = toRect(container.getBoundingClientRect());
    plugins.forEach(plugin => plugin.apply?.({ ...context, placement, anchor, popup, bounds: appliedBounds }));
  });

  const { options, plugins, containerEl, targetEl, jsMode } = config;
  const active =
    options.enabled !== false &&
    (jsMode || plugins.length > 0 || (!options.coverTarget && !!targetEl && 'nodeType' in targetEl));

  useIsomorphicLayoutEffect(() => {
    const win = containerEl?.ownerDocument.defaultView;

    if (!active || !containerEl || !targetEl || !win) {
      return;
    }

    const debouncedUpdate = debounce(update);
    const resizeObserver =
      options.disableUpdateOnResize || !win.ResizeObserver
        ? null
        : new win.ResizeObserver(entries => {
            // `display: none` is very likely being used to hide the element, users update it imperatively
            if (entries.every(entry => entry.contentRect.width > 0 && entry.contentRect.height > 0)) {
              debouncedUpdate();
            }
          });

    resizeObserver?.observe(containerEl);
    if ('nodeType' in targetEl) {
      resizeObserver?.observe(targetEl);
    }
    // `scroll` doesn't bubble, capturing it covers every scrollable ancestor
    win.addEventListener('scroll', debouncedUpdate, { capture: true, passive: true });
    win.addEventListener('resize', debouncedUpdate);

    if (jsMode) {
      // Position before the browser paints
      update();
    } else {
      debouncedUpdate();
    }

    return () => {
      resizeObserver?.disconnect();
      win.removeEventListener('scroll', debouncedUpdate, { capture: true });
      win.removeEventListener('resize', debouncedUpdate);
    };
  }, [active, jsMode, containerEl, targetEl, options.disableUpdateOnResize, update]);

  return update;
}
