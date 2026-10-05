'use client';

import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { PositioningShorthandValue } from '@fluentui/react-positioning';
import { resolvePositioningShorthand } from '@fluentui/react-positioning';
import type { LogicalAlignment, PositioningProps } from '../types';
import { debounce, getPlacementString } from '../utils';
import { normalizeAlign } from '../utils/placement';
import { POSITIONS } from '../constants';
import { computeFallbackPosition } from './computeFallbackPosition';
import type { FallbackPlacement } from './computeFallbackPosition';
import { getContainingBlockElement, measureContainingBlock } from './containingBlock';

export interface FallbackPositioningOptions {
  /** The browser positions the element with CSS, nothing to do */
  disabled: boolean;
  containerEl: HTMLElement | null;
  targetEl: HTMLElement | null;
  position: NonNullable<PositioningProps['position']>;
  align: LogicalAlignment;
  mainAxis: number;
  crossAxis: number;
  fallbackPositions: PositioningShorthandValue[];
  pinned?: boolean;
  coverTarget: boolean;
  matchTargetSize?: 'width';
  strategy: 'absolute' | 'fixed';
}

const toPlacement = (shorthand: PositioningShorthandValue): FallbackPlacement => {
  const { position = POSITIONS.above, align } = resolvePositioningShorthand(shorthand);
  return { position, align: normalizeAlign(align ?? 'center') };
};

/**
 * Positions the container in JavaScript the way CSS anchor positioning would, for browsers that don't support it.
 */
export function useFallbackPositioning(options: FallbackPositioningOptions): () => void {
  const update = useEventCallback(() => {
    const {
      containerEl: container,
      targetEl: target,
      position,
      align,
      mainAxis,
      crossAxis,
      fallbackPositions,
      pinned,
      coverTarget,
      matchTargetSize,
      strategy,
    } = options;

    if (!container || !target) {
      return;
    }

    const anchor = target.getBoundingClientRect();
    const win = container.ownerDocument.defaultView;
    const containingBlock = getContainingBlockElement(container, strategy);
    const { bounds, originLeft, originTop } = measureContainingBlock(container, containingBlock, strategy);

    if (matchTargetSize === 'width') {
      container.style.setProperty('width', `${anchor.width}px`);
    }

    const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;
    const {
      left,
      top,
      position: resolvedPosition,
      align: resolvedAlign,
    } = computeFallbackPosition({
      anchor: { left: anchor.left, top: anchor.top, width: anchor.width, height: anchor.height },
      bounds,
      width: container.offsetWidth,
      height: container.offsetHeight,
      // Logical directions of `position-area` are the ones of the containing block
      rtl:
        !!win && win.getComputedStyle(containingBlock ?? container.ownerDocument.documentElement).direction === 'rtl',
      placement: { position, align },
      fallbacks: fallbackPositions.length ? fallbackPositions.map(toPlacement) : undefined,
      pinned,
      coverTarget,
      marginBlock: isBlockMain ? mainAxis : crossAxis,
      marginInline: isBlockMain ? crossAxis : mainAxis,
    });

    container.style.setProperty('left', `${left - originLeft}px`);
    container.style.setProperty('top', `${top - originTop}px`);
    container.setAttribute('data-placement', getPlacementString(resolvedPosition, resolvedAlign));
  });

  const { disabled, containerEl, targetEl } = options;

  useIsomorphicLayoutEffect(() => {
    const win = containerEl?.ownerDocument.defaultView;

    if (disabled || !containerEl || !targetEl || !win) {
      return;
    }

    const debouncedUpdate = debounce(update);
    const resizeObserver = win.ResizeObserver ? new win.ResizeObserver(debouncedUpdate) : null;

    resizeObserver?.observe(containerEl);
    resizeObserver?.observe(targetEl);
    // `scroll` doesn't bubble, capturing it covers every scrollable ancestor
    win.addEventListener('scroll', debouncedUpdate, { capture: true, passive: true });
    win.addEventListener('resize', debouncedUpdate);

    // Position before the browser paints
    update();

    return () => {
      resizeObserver?.disconnect();
      win.removeEventListener('scroll', debouncedUpdate, { capture: true });
      win.removeEventListener('resize', debouncedUpdate);
    };
  }, [disabled, containerEl, targetEl, update]);

  return update;
}
