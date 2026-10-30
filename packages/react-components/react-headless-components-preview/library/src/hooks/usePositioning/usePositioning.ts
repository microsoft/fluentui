'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { usePositioning as useFloatingPositioning } from '@fluentui/react-positioning';
import type {
  PositioningImperativeRef,
  PositioningShorthandValue,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';
import type { PositioningReturn, PositioningTarget, UsePositioningOptions } from './types';
import { ABOVE, BEFORE, BELOW, CENTER, END, START } from './constants';
import { getPlacementString, normalizeAlign } from './utils/placement';
import {
  applyOffset,
  getPositionArea,
  resolveOffset,
  shorthandToPositionArea,
  updatePlacementAttribute,
} from './utils';
import { usePlacementObserver } from './usePlacementObserver';

export type TargetElement = HTMLElement | PositioningVirtualElement;

type PositioningEndEvent = Parameters<NonNullable<UsePositioningOptions['onPositioningEnd']>>[0];

const EMPTY_FALLBACK_POSITIONS: PositioningShorthandValue[] = [];

/** Written for CSS anchor positioning, removed when `@fluentui/react-positioning` positions the container */
const ANCHOR_STYLES = [
  'position-anchor',
  'position-area',
  'position-try-fallbacks',
  'place-self',
  'align-self',
  'justify-self',
  'margin-block-start',
  'margin-block-end',
  'margin-inline-start',
  'margin-inline-end',
];

/** Written by `@fluentui/react-positioning`, removed when CSS anchor positioning takes over */
const FLOATING_STYLES = ['transform', 'max-width', 'max-height'];
const FLOATING_ATTRIBUTES = ['data-popper-placement', 'data-popper-is-intersecting'];

let nextAnchorId = 0;

/**
 * Whether the options need JavaScript: CSS anchor positioning can't express them.
 */
const needsJavaScript = (
  options: UsePositioningOptions,
  target: PositioningTarget | null,
  arrow: HTMLElement | null,
): boolean =>
  // CSS can only anchor to an element
  (!!target && !('nodeType' in target)) ||
  // The arrow points to the center of the target
  !!arrow ||
  !!options.autoSize ||
  !!options.shiftToCoverTarget ||
  typeof options.offset === 'function' ||
  !!(options.flipBoundary || options.overflowBoundary || options.overflowBoundaryPadding);

/**
 * Positions an element next to a target with CSS anchor positioning. Falls back to `usePositioning()` from
 * `@fluentui/react-positioning` when the browser doesn't support anchor positioning, or when an option can't be
 * expressed with CSS: `autoSize`, `shiftToCoverTarget`, function offsets, boundaries, arrows and virtual element
 * targets.
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
    onPositioningEnd,
    enabled = true,
  } = options;

  const align = normalizeAlign(alignInput);

  const [mainAxis, crossAxis] = resolveOffset(offset);
  const blockPosition = position === ABOVE || position === BELOW;

  const { targetDocument } = useFluent();
  // The result doesn't change during the lifetime of the component
  const [supportsAnchors] = React.useState(
    () => !!targetDocument?.defaultView?.CSS?.supports?.('(anchor-name: --a) and (position-area: top)'),
  );

  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [arrowEl, setArrowEl] = React.useState<HTMLElement | null>(null);
  const [imperativeTarget, setImperativeTarget] = React.useState<PositioningTarget | null>(null);
  const overrideTarget = imperativeTarget ?? customTarget;
  const effectiveTarget: PositioningTarget | null = overrideTarget ?? triggerEl;

  const jsMode = !supportsAnchors || needsJavaScript(options, effectiveTarget, arrowEl);
  // The element that CSS anchors to, there is none when the container is positioned in JavaScript
  const anchorEl = enabled && !jsMode && effectiveTarget && 'nodeType' in effectiveTarget ? effectiveTarget : null;

  const [anchorName] = React.useState(() => `--popover-anchor-${++nextAnchorId}`);
  const positionArea = getPositionArea(position, align);
  const placement = getPlacementString(position, align);

  // Whether `@fluentui/react-positioning` wrote its styles since CSS anchor positioning was used
  const floatingStylesRef = React.useRef(false);
  const floatingPositioningRef = React.useRef<PositioningImperativeRef>(null);
  const onFloatingPositioningEnd = useEventCallback((event: PositioningEndEvent) => {
    floatingStylesRef.current = true;
    if (containerEl && effectiveTarget) {
      updatePlacementAttribute(effectiveTarget, containerEl);
    }
    onPositioningEnd?.(event);
  });
  const {
    targetRef: floatingTargetRef,
    containerRef: floatingContainerRef,
    arrowRef: floatingArrowRef,
  } = useFloatingPositioning({
    ...options,
    // `@fluentui/react-positioning` centers `before` and `after` with `start` and `end`, and `above` and `below` with
    // `top` and `bottom`
    align: blockPosition || align === CENTER ? align : align === START ? 'top' : 'bottom',
    // The default is different
    strategy,
    target: overrideTarget,
    positioningRef: floatingPositioningRef,
    enabled: enabled && jsMode,
    onPositioningEnd: onFloatingPositioningEnd,
  });

  const requestPlacementUpdate = usePlacementObserver(anchorEl && containerEl, anchorEl, options);

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: setImperativeTarget,
      updatePosition: () => (jsMode ? floatingPositioningRef.current?.updatePosition() : requestPlacementUpdate()),
    }),
    [jsMode, requestPlacementUpdate],
  );

  useIsomorphicLayoutEffect(() => {
    if (!anchorEl) {
      return;
    }

    // `anchor-name` is a comma-separated list. Append this instance's name
    // instead of overwriting so that multiple positioned popovers can share a
    // single trigger (e.g. a Tooltip on hover and a Menu on click attached to
    // the same button) without clobbering each other's anchor. On cleanup we
    // remove only our own name, preserving any others still in use.
    const previous = anchorEl.style.getPropertyValue('anchor-name');
    anchorEl.style.setProperty('anchor-name', previous ? `${previous}, ${anchorName}` : anchorName);

    return () => {
      const remaining = anchorEl.style
        .getPropertyValue('anchor-name')
        .replace(anchorName, '')
        .replace(/(^,\s*|,\s*$)/g, '')
        .replace(/,\s*,/, ',');
      if (remaining) {
        anchorEl.style.setProperty('anchor-name', remaining);
      } else {
        anchorEl.style.removeProperty('anchor-name');
      }
    };
  }, [anchorEl, anchorName]);

  useIsomorphicLayoutEffect(() => {
    const node = containerEl;

    if (!node || !enabled) {
      return;
    }

    node.setAttribute('data-placement', placement);

    if (jsMode) {
      // Positioned by `@fluentui/react-positioning`, it writes the position and the offsets
      ANCHOR_STYLES.forEach(property => node.style.removeProperty(property));
      return;
    }

    if (floatingStylesRef.current) {
      floatingStylesRef.current = false;
      FLOATING_STYLES.forEach(property => node.style.removeProperty(property));
      FLOATING_ATTRIBUTES.forEach(attribute => node.removeAttribute(attribute));
    }

    Object.assign(node.style, { position: strategy, inset: 'auto', margin: '0' });
    applyOffset(node, position, mainAxis, crossAxis);

    if (matchTargetSize === 'width') {
      node.style.setProperty('width', 'anchor-size(width)');
    } else {
      node.style.removeProperty('width');
    }

    node.style.setProperty('position-anchor', anchorName);

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
  }, [
    containerEl,
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
  ]);

  // The refs are stable, `@fluentui/react-positioning` gets the elements too
  const targetRef = React.useCallback(
    (node: HTMLElement | null) => {
      setTriggerEl(node);
      floatingTargetRef.current = node;
    },
    [floatingTargetRef, setTriggerEl],
  );
  const containerRef = React.useCallback(
    (node: HTMLElement | null) => {
      setContainerEl(node);
      floatingContainerRef.current = node;
    },
    [floatingContainerRef, setContainerEl],
  );
  const arrowRef = React.useCallback(
    (node: HTMLElement | null) => {
      setArrowEl(node);
      floatingArrowRef.current = node;
    },
    [floatingArrowRef, setArrowEl],
  );

  return { targetRef, containerRef, arrowRef };
}
