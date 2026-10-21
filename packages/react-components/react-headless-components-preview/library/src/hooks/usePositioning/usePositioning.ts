'use client';

import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { normalizeAutoSize } from '@fluentui/react-positioning';
import type {
  PositioningImperativeRef,
  PositioningShorthandValue,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';
import type { PositioningProps, PositioningReturn } from './types';
import { POSITIONS, ALIGNMENTS, POSITION_AREA_MAP } from './constants';
import { getPlacementString, normalizeAlign } from './utils/placement';
import { applyOffset, getCoverSelfAlignment, resolveElementRef, resolveOffset, shorthandToPositionArea } from './utils';
import { useAutoSize } from './useAutoSize';
import { usePlacementObserver } from './usePlacementObserver';

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
    autoSize,
  } = options;

  const align = normalizeAlign(alignInput);

  const resolvedOffset = resolveOffset(offset);
  const { mainAxis, crossAxis } = resolvedOffset;
  const coverAlignment = React.useMemo(
    () => (coverTarget ? getCoverSelfAlignment(position, align) : null),
    [coverTarget, position, align],
  );

  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [imperativeTarget, setImperativeTarget] = React.useState<HTMLElement | null>(null);
  const effectiveTarget = imperativeTarget ?? resolveElementRef(customTarget) ?? triggerEl;

  const anchorName = `--${useId('popover-anchor-')}`;
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);

  const { targetDocument } = useFluent();

  const fallbackAreas = React.useMemo(() => fallbackPositions.map(shorthandToPositionArea), [fallbackPositions]);

  const normalizedAutoSize = React.useMemo(() => normalizeAutoSize(autoSize), [autoSize]);

  const applyAutoSize = useAutoSize({
    containerEl,
    targetEl: effectiveTarget,
    targetDocument,
    autoSize: normalizedAutoSize,
    position,
    offset: resolvedOffset,
    pinned: Boolean(pinned),
    coverTarget,
  });

  const requestPlacementUpdate = usePlacementObserver(
    containerEl,
    effectiveTarget,
    targetDocument,
    coverTarget && !normalizedAutoSize,
    applyAutoSize,
  );

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: (el: TargetElement | null) => {
        setImperativeTarget(resolveElementRef(el));
      },
      updatePosition: requestPlacementUpdate,
    }),
    [requestPlacementUpdate],
  );

  useIsomorphicLayoutEffect(() => {
    if (!effectiveTarget) {
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
  }, [effectiveTarget, anchorName]);

  const targetRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setTriggerEl(node);
  }, []);

  const containerRef: React.RefCallback<HTMLElement> = React.useCallback(
    node => {
      setContainerEl(node);

      if (!node) {
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
         `inline-start`, `inline-end`) or `span-all`.
      */
      node.style.removeProperty('place-self');

      if (align === ALIGNMENTS.center) {
        const isBlockAxisMain = position === POSITIONS.above || position === POSITIONS.below;

        node.style.setProperty(isBlockAxisMain ? 'justify-self' : 'align-self', 'anchor-center');
        node.style.removeProperty(isBlockAxisMain ? 'align-self' : 'justify-self');
      } else {
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
    ],
  );

  return { targetRef, containerRef };
}
