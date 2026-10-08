'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type {
  PositioningImperativeRef,
  PositioningShorthandValue,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';
import type { PositioningReturn, PositioningTarget, UsePositioningOptions } from './types';
import { ABOVE, BEFORE, BELOW, CENTER, END, START } from './constants';
import { getPlacementString, normalizeAlign } from './utils/placement';
import { applyOffset, getPositionArea, resolveOffset, shorthandToPositionArea } from './utils';
import { usePositionUpdates } from './usePositionUpdates';

export type TargetElement = HTMLElement | PositioningVirtualElement;

const EMPTY_FALLBACK_POSITIONS: PositioningShorthandValue[] = [];
let nextAnchorId = 0;

/**
 * Positions an element next to a target with CSS anchor positioning, or in JavaScript when the browser doesn't support it
 * or when an option can't be handled by CSS (function offsets, boundaries and virtual element targets).
 */
export function usePositioning(options: UsePositioningOptions): PositioningReturn {
  const {
    pinned,
    target: customTarget = null,
    align: alignInput = CENTER,
    position = ABOVE,
    fallbackPositions = EMPTY_FALLBACK_POSITIONS,
    offset,
    coverTarget = false,
    strategy = 'fixed',
    matchTargetSize,
    positioningRef,
    enabled,
  } = options;

  const align = normalizeAlign(alignInput);

  const [mainAxis, crossAxis] = resolveOffset(offset);
  const blockPosition = position === ABOVE || position === BELOW;

  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [arrowEl, setArrowEl] = React.useState<HTMLElement | null>(null);
  const [imperativeTarget, setImperativeTarget] = React.useState<PositioningTarget | null>(null);
  const effectiveTarget: PositioningTarget | null = imperativeTarget ?? customTarget ?? triggerEl;

  const [anchorName] = React.useState(() => `--popover-anchor-${++nextAnchorId}`);
  const positionArea = getPositionArea(position, align);
  const placement = getPlacementString(position, align);

  // The result doesn't change during the lifetime of the component
  const [useAnchors] = React.useState(!!globalThis.CSS?.supports?.('(anchor-name: --a) and (position-area: top)'));
  // CSS needs an element to anchor to, and can't handle some of the options
  const jsMode =
    !useAnchors ||
    (!!effectiveTarget && !('nodeType' in effectiveTarget)) ||
    typeof offset === 'function' ||
    !!(options.flipBoundary || options.overflowBoundary || options.overflowBoundaryPadding);

  const requestUpdate = usePositionUpdates([options, containerEl, effectiveTarget, arrowEl, jsMode]);

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: setImperativeTarget,
      updatePosition: requestUpdate,
    }),
    [requestUpdate],
  );

  useIsomorphicLayoutEffect(() => {
    if (!effectiveTarget || !('nodeType' in effectiveTarget) || jsMode) {
      return;
    }

    // `anchor-name` is a comma-separated list. Append this instance's name
    // instead of overwriting so that multiple positioned popovers can share a
    // single trigger (e.g. a Tooltip on hover and a Menu on click attached to
    // the same button) without clobbering each other's anchor. On cleanup we
    // remove only our own name, preserving any others still in use.
    const previous = effectiveTarget.style.getPropertyValue('anchor-name');
    effectiveTarget.style.setProperty('anchor-name', previous ? `${previous}, ${anchorName}` : anchorName);

    return () => {
      const remaining = effectiveTarget.style
        .getPropertyValue('anchor-name')
        .replace(anchorName, '')
        .replace(/(^,\s*|,\s*$)/g, '')
        .replace(/,\s*,/, ',');
      if (remaining) {
        effectiveTarget.style.setProperty('anchor-name', remaining);
      } else {
        effectiveTarget.style.removeProperty('anchor-name');
      }
    };
  }, [effectiveTarget, anchorName, jsMode]);

  const containerRef: React.RefCallback<HTMLElement> = React.useCallback(
    node => {
      setContainerEl(node);

      if (!node || enabled === false) {
        return;
      }

      Object.assign(node.style, { position: strategy, inset: 'auto', margin: '0' });

      if (jsMode) {
        // Positioned in JavaScript, see `usePositionUpdates()`
        'position-anchor position-area position-try-fallbacks place-self align-self justify-self'
          .split(' ')
          .forEach(property => node.style.removeProperty(property));
        Object.assign(node.style, { left: '0', top: '0' });
        if (matchTargetSize !== 'width') {
          node.style.removeProperty('width');
        }
        node.setAttribute('data-placement', placement);
        return;
      }

      applyOffset(node, position, mainAxis, crossAxis);

      if (matchTargetSize === 'width') {
        node.style.setProperty('width', 'anchor-size(width)');
      } else {
        node.style.removeProperty('width');
      }

      node.style.setProperty('position-anchor', anchorName);
      node.setAttribute('data-placement', placement);

      if (coverTarget) {
        node.style.setProperty('position-area', 'center');
        node.style.setProperty('align-self', blockPosition ? (position === ABOVE ? END : START) : align);
        node.style.setProperty('justify-self', blockPosition ? align : position === BEFORE ? END : START);
        node.style.removeProperty('position-try-fallbacks');
        return;
      }

      node.style.setProperty('position-area', positionArea);

      /*
       * Workaround for https://crbug.com/438334710: Chromium (<=130-ish) doesn't
         apply the implicit `anchor-center` self-alignment that the spec defines
         for single-keyword `position-area` values (`block-start`, `block-end`,
    `    inline-start`, `inline-end`) or `span-all`.
      */
      if (align === CENTER) {
        node.style.setProperty('place-self', 'anchor-center');
      } else {
        node.style.removeProperty('place-self');
        node.style.removeProperty('align-self');
        node.style.removeProperty('justify-self');
      }

      if (pinned) {
        node.style.removeProperty('position-try-fallbacks');
        return;
      }

      if (fallbackPositions.length > 0) {
        node.style.setProperty('position-try-fallbacks', fallbackPositions.map(shorthandToPositionArea).join(', '));
      } else {
        node.style.setProperty('position-try-fallbacks', 'flip-block, flip-inline, flip-block flip-inline');
      }
    },
    [
      enabled,
      jsMode,
      anchorName,
      positionArea,
      placement,
      fallbackPositions,
      pinned,
      position,
      align,
      mainAxis,
      crossAxis,
      coverTarget,
      blockPosition,
      strategy,
      matchTargetSize,
      setContainerEl,
    ],
  );

  return { targetRef: setTriggerEl, containerRef, arrowRef: setArrowEl };
}
