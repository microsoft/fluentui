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
import { getPositionArea, shorthandToPositionArea, updatePlacementAttribute } from './utils';
import { usePlacementObserver } from './usePlacementObserver';

export type TargetElement = HTMLElement | PositioningVirtualElement;

type PositioningEndEvent = Parameters<NonNullable<UsePositioningOptions['onPositioningEnd']>>[0];

const EMPTY_FALLBACK_POSITIONS: PositioningShorthandValue[] = [];

/** The `position-try-fallbacks` used when no `fallbackPositions` are passed */
const DEFAULT_FLIP = 'flip-block, flip-inline, flip-block flip-inline';

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
const FLOATING_STYLES = [
  'position',
  'left',
  'top',
  'margin',
  'transform',
  'max-width',
  'max-height',
  'width',
  'height',
  'box-sizing',
  'overflow-x',
  'overflow-y',
  '--fui-match-target-size',
];
const FLOATING_ATTRIBUTES = ['data-popper-placement', 'data-popper-is-intersecting'];

const preserveStyles = (node: HTMLElement, properties: string[]) => {
  const original = properties.map(property => [
    property,
    node.style.getPropertyValue(property),
    node.style.getPropertyPriority(property),
  ]);
  let written: string[][] | undefined;
  const record = () => {
    written = properties.map(property => [
      node.style.getPropertyValue(property),
      node.style.getPropertyPriority(property),
    ]);
  };
  const restore = () => {
    original.forEach(([property, value, priority], index) => {
      // A consumer may have replaced an engine's inline value since the last completed positioning pass.
      if (
        written &&
        (node.style.getPropertyValue(property) !== written[index][0] ||
          node.style.getPropertyPriority(property) !== written[index][1])
      ) {
        return;
      }
      if (value) {
        node.style.setProperty(property, value, priority);
      } else {
        node.style.removeProperty(property);
      }
    });
  };
  return { record, restore };
};

type SavedStyles = ReturnType<typeof preserveStyles> & { node: HTMLElement };

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
  (typeof options.flipBoundaryPadding === 'object'
    ? Object.values(options.flipBoundaryPadding).some(padding => !!padding)
    : !!options.flipBoundaryPadding) ||
  !!(options.flipBoundary || options.overflowBoundary || options.overflowBoundaryPadding);

/**
 * Positions an element next to a target with CSS anchor positioning. Falls back to `usePositioning()` from
 * `@fluentui/react-positioning` when the browser doesn't support anchor positioning, or when an option can't be
 * expressed with CSS: `autoSize`, `shiftToCoverTarget`, function offsets, boundaries, nonzero `flipBoundaryPadding`,
 * arrows and virtual element targets.
 * Both paths dispatch `fui-positioningend` on the container and deliver `onPositioningEnd` through its listener.
 * CSS option updates schedule completion after the new styles have been applied.
 * Engine handoffs restore consumer inline sizing and overflow before the next engine takes ownership.
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

  // The function form can't be expressed with CSS, `@fluentui/react-positioning` handles it
  const mainAxis = typeof offset === 'number' ? offset : (typeof offset === 'object' && offset?.mainAxis) || 0;
  const crossAxis = (typeof offset === 'object' && offset?.crossAxis) || 0;
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
  const fallbackAreas = React.useMemo(
    () => (fallbackPositions.length > 0 ? fallbackPositions.map(shorthandToPositionArea).join(', ') : DEFAULT_FLIP),
    [fallbackPositions],
  );

  const floatingStylesRef = React.useRef<SavedStyles | null>(null);
  const initialFloatingStylesRef = React.useRef<SavedStyles | null>(null);
  // These effects precede the delegated hook: release CSS's width before JS measures it, and save consumer styles
  // before the position manager writes. Cleanup restores sizing/overflow on handoff, disable and unmount.
  useIsomorphicLayoutEffect(() => {
    if (!containerEl || !enabled || jsMode || matchTargetSize !== 'width') {
      return;
    }
    const saved = preserveStyles(containerEl, ['width']);
    containerEl.style.setProperty('width', 'anchor-size(width)');
    saved.record();
    return saved.restore;
  }, [containerEl, enabled, jsMode, matchTargetSize]);

  useIsomorphicLayoutEffect(() => {
    const initial = initialFloatingStylesRef.current;
    initialFloatingStylesRef.current = null;
    if (!containerEl || !enabled || !jsMode) {
      return;
    }
    floatingStylesRef.current =
      initial?.node === containerEl ? initial : { node: containerEl, ...preserveStyles(containerEl, FLOATING_STYLES) };
    return () => {
      floatingStylesRef.current?.restore();
      floatingStylesRef.current = null;
      FLOATING_ATTRIBUTES.forEach(attribute => containerEl.removeAttribute(attribute));
    };
  }, [containerEl, enabled, jsMode]);

  const floatingPositioningRef = React.useRef<PositioningImperativeRef>(null);
  const onFloatingPositioningEnd = useEventCallback((event: PositioningEndEvent) => {
    if (jsMode) {
      floatingStylesRef.current?.record();
      if (containerEl && effectiveTarget) {
        updatePlacementAttribute(effectiveTarget, containerEl);
      }
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
    // The defaults are different
    position,
    strategy,
    target: overrideTarget,
    positioningRef: floatingPositioningRef,
    enabled: enabled && jsMode,
    onPositioningEnd: onFloatingPositioningEnd,
  });

  const requestPlacementUpdate = usePlacementObserver(anchorEl && containerEl, anchorEl, {
    ...options,
    position,
    align,
  });

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
        .split(',')
        .map(name => name.trim())
        .filter(name => name && name !== anchorName)
        .join(', ');
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

    const set = (property: string, value: string | null) =>
      value === null ? node.style.removeProperty(property) : node.style.setProperty(property, value);
    const setAxisMargin = (axis: 'block' | 'inline', px: number) => {
      if (px) {
        set(`margin-${axis}-start`, `${px}px`);
        set(`margin-${axis}-end`, `${px}px`);
      }
    };

    node.setAttribute('data-placement', placement);

    if (jsMode) {
      // Positioned by `@fluentui/react-positioning`, it writes the position and the offsets
      ANCHOR_STYLES.forEach(property => set(property, null));
      return;
    }

    Object.assign(node.style, { position: strategy, inset: 'auto', margin: '0' });
    setAxisMargin(blockPosition ? 'block' : 'inline', mainAxis);
    setAxisMargin(blockPosition ? 'inline' : 'block', crossAxis);
    set('position-anchor', anchorName);

    if (coverTarget) {
      set('position-area', 'center');
      set('align-self', blockPosition ? (position === ABOVE ? END : START) : align);
      set('justify-self', blockPosition ? align : position === BEFORE ? END : START);
      set('position-try-fallbacks', null);
      return;
    }

    set('position-area', positionArea);

    /*
     * Workaround for https://crbug.com/438334710: Chromium (<=130-ish) doesn't
     * apply the implicit `anchor-center` self-alignment that the spec defines
     * for single-keyword `position-area` values (`block-start`, `block-end`,
     * `inline-start`, `inline-end`) or `span-all`.
     */
    if (align === CENTER) {
      set('place-self', 'anchor-center');
    } else {
      set('place-self', null);
      set('align-self', null);
      set('justify-self', null);
    }

    set('position-try-fallbacks', pinned ? null : fallbackAreas);
  }, [
    containerEl,
    enabled,
    jsMode,
    anchorName,
    positionArea,
    placement,
    fallbackAreas,
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

  // Closed overlays don't promote their trigger to state until a container exists.
  const triggerNodeRef = React.useRef<HTMLElement | null>(null);
  const containerNodeRef = React.useRef<HTMLElement | null>(null);
  const targetRef = React.useCallback(
    (node: HTMLElement | null) => {
      triggerNodeRef.current = node;
      if (containerNodeRef.current || node === null) {
        setTriggerEl(node);
      }
      floatingTargetRef.current = node;
    },
    [floatingTargetRef, setTriggerEl],
  );
  const containerRef = React.useCallback(
    (node: HTMLElement | null) => {
      containerNodeRef.current = node;
      setContainerEl(node);
      setTriggerEl(node ? triggerNodeRef.current : null);
      // A ref can initialize the JS manager before layout effects run.
      if (node) {
        initialFloatingStylesRef.current = { node, ...preserveStyles(node, FLOATING_STYLES) };
      }
      floatingContainerRef.current = node;
    },
    [floatingContainerRef, setContainerEl, setTriggerEl],
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
