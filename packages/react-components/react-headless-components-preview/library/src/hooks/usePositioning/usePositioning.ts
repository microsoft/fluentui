'use client';

import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type {
  PositioningImperativeRef,
  PositioningShorthandValue,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';
import type { PositioningProps, PositioningReturn } from './types';
import { POSITIONS, ALIGNMENTS, POSITION_AREA_MAP } from './constants';
import {
  getDefaultFallbackPositions,
  getLogicalPlacement,
  getPlacementString,
  normalizeAlign,
} from './utils/placement';
import { applyOffset, getCoverSelfAlignment, resolveElementRef, resolveOffset, shorthandToPositionArea } from './utils';
import { usePlacementObserver } from './usePlacementObserver';
import { useOverlayRuntime } from '../../overlayRuntime';

export type TargetElement = HTMLElement | PositioningVirtualElement;

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

export function usePositioning(options: PositioningProps): PositioningReturn {
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
  const [imperativeTarget, setImperativeTarget] = React.useState<HTMLElement | null>(null);
  const effectiveTarget = imperativeTarget ?? resolveElementRef(customTarget) ?? triggerEl;
  const fallbackManagerRef = React.useRef<{ updatePosition: () => void; dispose: () => void } | null>(null);

  const anchorName = `--${useId('popover-anchor-')}`;
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);

  const { dir, targetDocument } = useFluent();
  const overlayRuntime = useOverlayRuntime(targetDocument);

  const fallbackAreas = React.useMemo(() => fallbackPositions.map(shorthandToPositionArea), [fallbackPositions]);
  const fallbackPlacements = React.useMemo(
    () =>
      fallbackPositions.length > 0
        ? fallbackPositions
        : getDefaultFallbackPositions(position, align),
    [align, fallbackPositions, position],
  );

  const requestPlacementUpdate = usePlacementObserver(
    containerEl,
    effectiveTarget,
    targetDocument,
    coverTarget || overlayRuntime.mode !== 'native',
  );

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: (el: TargetElement | null) => {
        setImperativeTarget(resolveElementRef(el));
      },
      updatePosition: () => {
        if (overlayRuntime.mode === 'fallback-ready') {
          fallbackManagerRef.current?.updatePosition();
        } else {
          requestPlacementUpdate();
        }
      },
    }),
    [overlayRuntime.mode, requestPlacementUpdate],
  );

  useIsomorphicLayoutEffect(() => {
    if (overlayRuntime.mode !== 'native' || !effectiveTarget) {
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
  }, [anchorName, effectiveTarget, overlayRuntime.mode]);

  useIsomorphicLayoutEffect(() => {
    if (
      overlayRuntime.mode !== 'fallback-ready' ||
      !effectiveTarget ||
      !containerEl
    ) {
      return;
    }

    containerEl.setAttribute('data-placement', placement);
    const previousZIndex = containerEl.style.zIndex;
    const previousVisibility = containerEl.style.visibility;
    if (!previousZIndex) {
      containerEl.style.zIndex = '1000000';
    }
    containerEl.style.visibility = 'hidden';

    const manager = overlayRuntime.runtime.positioning.createPositioningManager_unstable({
      target: effectiveTarget,
      container: containerEl,
      arrow: arrowEl,
      dir,
      targetDocument,
      align: alignInput,
      position,
      fallbackPositions: fallbackPlacements,
      offset: { mainAxis, crossAxis },
      coverTarget,
      strategy,
      matchTargetSize,
      pinned: pinned || coverTarget,
      useTransform: false,
      unstable_disableShift: true,
      unstable_flipFallbackStrategy: 'initialPlacement',
      onPositioningEnd: event => {
        const resolvedPlacement = getLogicalPlacement(event.detail.placement, dir);
        if (resolvedPlacement) {
          containerEl.setAttribute('data-placement', resolvedPlacement);
        }
        containerEl.style.visibility = previousVisibility;
      },
    });

    fallbackManagerRef.current = manager;

    return () => {
      manager.dispose();
      containerEl.style.zIndex = previousZIndex;
      containerEl.style.visibility = previousVisibility;
      if (fallbackManagerRef.current === manager) {
        fallbackManagerRef.current = null;
      }
    };
  }, [
    alignInput,
    arrowEl,
    containerEl,
    coverTarget,
    crossAxis,
    dir,
    effectiveTarget,
    fallbackPlacements,
    mainAxis,
    matchTargetSize,
    overlayRuntime,
    pinned,
    placement,
    position,
    strategy,
    targetDocument,
  ]);

  const targetRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setTriggerEl(node);
  }, []);

  const arrowRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setArrowEl(node);
  }, []);

  const containerRef: React.RefCallback<HTMLElement> = React.useCallback(
    node => {
      setContainerEl(node);

      if (!node || overlayRuntime.mode !== 'native') {
        return;
      }

      node.style.setProperty('position', strategy);
      node.style.setProperty('inset', 'auto');
      node.style.setProperty('margin', '0');

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
      overlayRuntime.mode,
    ],
  );

  return { targetRef, containerRef, arrowRef } as PositioningReturn & {
    arrowRef: React.RefCallback<HTMLElement>;
  };
}
