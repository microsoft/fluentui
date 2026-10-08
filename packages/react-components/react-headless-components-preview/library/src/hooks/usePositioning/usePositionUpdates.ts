'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { LogicalAlignment, PositioningTarget, UsePositioningOptions } from './types';
import type { FallbackInput, FallbackPlacement } from './fallback/computeFallbackPosition';
import { computeFallbackPosition } from './fallback/computeFallbackPosition';
import { getContainingBlock } from './fallback/containingBlock';
import { ABOVE, BELOW } from './constants';
import { computePosition, debounce, getPlacementString, resolveOffset } from './utils';
import { normalizeAlign } from './utils/placement';
import type { PositioningShorthandValue } from '@fluentui/react-positioning';
import { resolvePositioningShorthand } from './resolvePositioningShorthand';
import { applyArrow } from './plugins/arrowPlugin';
import { applyAutoSize } from './plugins/autoSizePlugin';
import { applyBoundary } from './plugins/boundaryPlugin';
import { applyVisibility } from './plugins/hidePlugin';
import { applyFunctionOffset } from './plugins/offsetPlugin';

export type PositionUpdatesOptions = [
  options: UsePositioningOptions,
  containerEl: HTMLElement | null,
  targetEl: PositioningTarget | null,
  arrowEl: HTMLElement | null,
  /** The position is computed in JavaScript, otherwise the browser does it with CSS */
  jsMode: boolean,
];

const toPlacement = (shorthand: PositioningShorthandValue): FallbackPlacement => {
  const { position = ABOVE, align } = resolvePositioningShorthand(shorthand);
  return { position, align: normalizeAlign(align ?? 'center') };
};

/**
 * Keeps the container positioned, and runs the plugins after every update. The container is positioned with CSS when
 * the browser supports it, otherwise it's done here in JavaScript using the same rules as CSS.
 */
export function usePositionUpdates(config: PositionUpdatesOptions): () => void {
  const configRef = React.useRef(config);
  useIsomorphicLayoutEffect(() => {
    configRef.current = config;
  });

  const update = React.useCallback(() => {
    const [options, container, target, arrow, jsMode] = configRef.current;
    const win = container?.ownerDocument.defaultView;

    if (!container || !target || !win) {
      return;
    }

    const { position = ABOVE, strategy = 'fixed', coverTarget = false, matchTargetSize } = options;
    const align: LogicalAlignment = normalizeAlign(options.align ?? 'center');
    const [containingBlock, bounds, originLeft, originTop] = getContainingBlock(container, strategy);
    // Logical directions of `position-area` are the ones of the containing block
    const rtl = win.getComputedStyle(containingBlock ?? container.ownerDocument.documentElement).direction === 'rtl';
    const anchor = target.getBoundingClientRect();
    let placement: FallbackPlacement | null = null;
    // Where the container can be, plugins can change it
    let appliedBounds = bounds;

    if (jsMode) {
      const [mainAxis, crossAxis] = resolveOffset(options.offset);
      const isBlockMain = position === ABOVE || position === BELOW;
      const { fallbackPositions = [], pinned } = options;

      if (matchTargetSize === 'width') {
        container.style.setProperty('width', `${anchor.width}px`);
      }

      const input: FallbackInput = [
        anchor,
        bounds,
        container.offsetWidth,
        container.offsetHeight,
        rtl,
        { position, align },
        isBlockMain ? mainAxis : crossAxis,
        isBlockMain ? crossAxis : mainAxis,
        undefined,
        fallbackPositions.length ? fallbackPositions.map(toPlacement) : undefined,
        pinned,
        coverTarget,
      ];

      applyFunctionOffset(input, options.offset);
      if (options.flipBoundary || options.overflowBoundary || options.overflowBoundaryPadding) {
        applyBoundary(input, container, rtl, options);
      }

      const result = computeFallbackPosition(input);
      placement = result;
      appliedBounds = input[1];

      container.style.setProperty('left', `${result.left - originLeft}px`);
      container.style.setProperty('top', `${result.top - originTop}px`);
      container.setAttribute('data-placement', getPlacementString(result.position, result.align));
    } else if (!coverTarget && 'nodeType' in target) {
      // The browser picks the placement, it's detected from the rects
      const detected = computePosition(target, container);

      if (detected) {
        placement = detected;

        if (container.getAttribute('data-placement') !== detected.placement) {
          container.setAttribute('data-placement', detected.placement);
        }
      }
    }

    const popup = container.getBoundingClientRect();
    applyAutoSize(container, placement, anchor, appliedBounds, rtl, options);
    applyArrow(arrow, placement, anchor, popup, options.arrowPadding);
    applyVisibility(container, target, rtl, placement, anchor, popup, options.onPositioningEnd);
  }, []);

  const [options, containerEl, targetEl, , jsMode] = config;
  const active = options.enabled !== false;

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
