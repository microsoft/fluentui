'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { createPositionManager } from '@fluentui/react-positioning';
import type {
  PositionManager,
  PositionManagerOptions,
  PositioningImperativeRef,
  PositioningShorthandValue,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';
import type { PositioningReturn, UsePositioningOptions } from './types';
import { POSITIONS, ALIGNMENTS } from './constants';
import { getPlacementString, normalizeAlign } from './utils/placement';
import {
  applyOffset,
  computePosition,
  getCoverSelfAlignment,
  getPositionArea,
  resolveElementRef,
  resolveOffset,
  shorthandToPositionArea,
} from './utils';

let nextAnchorId = 0;

export type TargetElement = HTMLElement | PositioningVirtualElement;

/**
 * CSS anchor positioning with the features that are used by the hook.
 */
const supportsAnchorPositioning = (): boolean =>
  !!globalThis.CSS?.supports?.('(anchor-name: --a) and (position-area: top)');

const CSS_ANCHOR_PROPERTIES = [
  'position-anchor',
  'position-area',
  'position-try-fallbacks',
  'place-self',
  'align-self',
  'justify-self',
];

const DEFAULT_FLIP = ['flip-block', 'flip-inline', 'flip-block flip-inline'];

const EMPTY_FALLBACK_POSITIONS: PositioningShorthandValue[] = [];

/**
 * Reads the current anchor-name property from an element and parses it into an array of names.
 * Handles comma-separated values and trimming.
 */
const readAnchorNames = (element: HTMLElement): string[] => {
  return element.style
    .getPropertyValue('anchor-name')
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);
};

/**
 * Positions an element next to a target using CSS anchor positioning.
 *
 * The position is computed in JavaScript, with `@fluentui/react-positioning`, when the browser doesn't support CSS
 * anchor positioning or when an option can't be handled by CSS: function offsets, boundaries and virtual element
 * targets. `autoSize`, the arrow and `onPositioningEnd` are handled for both.
 */
export function usePositioning(options: UsePositioningOptions): PositioningReturn {
  const {
    pinned,
    target: customTarget = null,
    align: alignInput = ALIGNMENTS.center,
    position = POSITIONS.above,
    fallbackPositions = EMPTY_FALLBACK_POSITIONS,
    offset,
    coverTarget = false,
    strategy = 'fixed',
    matchTargetSize,
    positioningRef,
    enabled = true,
  } = options;

  const align = normalizeAlign(alignInput);

  const { mainAxis, crossAxis } = resolveOffset(offset);
  const coverAlignment = React.useMemo(
    () => (coverTarget ? getCoverSelfAlignment(position, align) : null),
    [coverTarget, position, align],
  );

  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [arrowEl, setArrowEl] = React.useState<HTMLElement | null>(null);
  const [imperativeTarget, setImperativeTarget] = React.useState<TargetElement | null>(null);
  const positioningTarget: TargetElement | null = imperativeTarget ?? customTarget ?? triggerEl;
  // CSS can only anchor to elements
  const effectiveTarget = resolveElementRef(positioningTarget);

  // The result doesn't change during the lifetime of the component
  const [supportsAnchors] = React.useState(supportsAnchorPositioning);
  // CSS needs an element to anchor to, and can't handle some of the options
  const javaScriptPositioning =
    !supportsAnchors ||
    (!!positioningTarget && !effectiveTarget) ||
    typeof offset === 'function' ||
    !!(options.flipBoundary || options.overflowBoundary || options.overflowBoundaryPadding);

  const [anchorName] = React.useState(() => `--popover-anchor-${++nextAnchorId}`);
  const positionArea = getPositionArea(position, align);
  const placement = getPlacementString(position, align);

  const fallbackAreas = React.useMemo(() => fallbackPositions.map(shorthandToPositionArea), [fallbackPositions]);

  // Read by the manager on every update
  const [settings] = React.useState<Record<string, unknown>>({});
  const managerRef = React.useRef<PositionManager | null>(null);
  const nextSettings: Record<string, unknown> = { ...options, position, align: alignInput, strategy };
  useIsomorphicLayoutEffect(() => {
    const changed = Object.keys({ ...settings, ...nextSettings }).filter(key => settings[key] !== nextSettings[key]);
    changed.forEach(key => {
      settings[key] = nextSettings[key];
    });

    if (changed.length > 0) {
      managerRef.current?.updatePosition();
    }
  });

  const disableUpdateOnResize = options.disableUpdateOnResize;
  useIsomorphicLayoutEffect(() => {
    if (!enabled || !containerEl || !positioningTarget) {
      return;
    }

    const onPositioningEndEvent = (e: Event) =>
      (settings.onPositioningEnd as UsePositioningOptions['onPositioningEnd'])?.(
        e as Parameters<NonNullable<UsePositioningOptions['onPositioningEnd']>>[0],
      );
    containerEl.addEventListener('fui-positioningend', onPositioningEndEvent);

    const manager = createPositionManager(
      Object.assign(settings, {
        container: containerEl,
        target: positioningTarget,
        arrow: arrowEl,
        // The browser picks the placement, it's detected from the rects
        detectPlacement: javaScriptPositioning
          ? undefined
          : (target: TargetElement, container: HTMLElement) =>
              !settings.coverTarget && 'nodeType' in target ? computePosition(target, container) : null,
        onPlacement: ({
          position: resolvedPosition,
          align: resolvedAlign,
        }: Parameters<NonNullable<PositionManagerOptions['onPlacement']>>[0]) =>
          containerEl.setAttribute('data-placement', getPlacementString(resolvedPosition, resolvedAlign)),
        attributes: {
          placement: '',
          hidden: 'data-positioning-hidden',
          escaped: 'data-positioning-escaped',
          intersecting: '',
        },
      }) as unknown as PositionManagerOptions,
    );
    managerRef.current = manager;

    return () => {
      containerEl.removeEventListener('fui-positioningend', onPositioningEndEvent);
      manager.dispose();
      managerRef.current = null;
    };
  }, [
    enabled,
    javaScriptPositioning,
    containerEl,
    positioningTarget,
    arrowEl,
    strategy,
    disableUpdateOnResize,
    settings,
  ]);

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: setImperativeTarget,
      updatePosition: () => managerRef.current?.updatePosition(),
    }),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    if (!effectiveTarget || !enabled || javaScriptPositioning) {
      return;
    }

    // `anchor-name` is a comma-separated list. Append this instance's name
    // instead of overwriting so that multiple positioned popovers can share a
    // single trigger (e.g. a Tooltip on hover and a Menu on click attached to
    // the same button) without clobbering each other's anchor. On cleanup we
    // remove only our own name, preserving any others still in use.
    if (anchorName) {
      const names = readAnchorNames(effectiveTarget);
      if (!names.includes(anchorName)) {
        effectiveTarget.style.setProperty('anchor-name', [...names, anchorName].join(', '));
      }
    }

    return () => {
      if (anchorName) {
        const remaining = readAnchorNames(effectiveTarget).filter(name => name !== anchorName);
        if (remaining.length > 0) {
          effectiveTarget.style.setProperty('anchor-name', remaining.join(', '));
        } else {
          effectiveTarget.style.removeProperty('anchor-name');
        }
      }
    };
  }, [effectiveTarget, anchorName, enabled, javaScriptPositioning]);

  const containerRef: React.RefCallback<HTMLElement> = React.useCallback(
    node => {
      setContainerEl(node);

      if (!node || !enabled) {
        return;
      }

      if (javaScriptPositioning) {
        // The position is written by `@fluentui/react-positioning`, only the styles of the other mode are removed
        CSS_ANCHOR_PROPERTIES.forEach(property => node.style.removeProperty(property));
        if (matchTargetSize !== 'width') {
          node.style.removeProperty('width');
        }
        node.setAttribute('data-placement', placement);
        return;
      }

      node.style.setProperty('position', strategy);
      node.style.setProperty('inset', 'auto');
      node.style.setProperty('margin', '0');
      node.style.removeProperty('transform');

      applyOffset(node, position, mainAxis, crossAxis);

      if (matchTargetSize === 'width') {
        node.style.setProperty('width', 'anchor-size(width)');
      } else {
        node.style.removeProperty('width');
      }

      node.style.setProperty('position-anchor', anchorName);
      node.setAttribute('data-placement', placement);

      if (coverAlignment) {
        node.style.setProperty('position-area', 'center');
        node.style.setProperty('align-self', coverAlignment.alignSelf);
        node.style.setProperty('justify-self', coverAlignment.justifySelf);
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
      if (align === ALIGNMENTS.center) {
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

      if (fallbackAreas.length > 0) {
        node.style.setProperty('position-try-fallbacks', fallbackAreas.join(', '));
      } else {
        node.style.setProperty('position-try-fallbacks', DEFAULT_FLIP.join(', '));
      }
    },
    [
      enabled,
      javaScriptPositioning,
      anchorName,
      positionArea,
      placement,
      fallbackAreas,
      pinned,
      position,
      align,
      mainAxis,
      crossAxis,
      coverAlignment,
      strategy,
      matchTargetSize,
    ],
  );

  return { targetRef: setTriggerEl, containerRef, arrowRef: setArrowEl };
}
