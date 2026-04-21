'use client';

import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { PositioningImperativeRef, PositioningProps, PositioningReturn } from './types';
import { POSITIONS, ALIGNMENTS, POSITION_AREA_MAP } from './constants';
import { getPlacementString, normalizeAlign } from './utils/placement';
import { applyOffset, getCoverSelfAlignment, resolveElementRef, resolveOffset, shorthandToPositionArea } from './utils';
import { usePlacementObserver } from './usePlacementObserver';

const DEFAULT_FLIP = ['flip-block', 'flip-inline', 'flip-block flip-inline'];

export function usePositioning(options: PositioningProps): PositioningReturn {
  const {
    pinned,
    target: customTarget = null,
    align: alignInput = ALIGNMENTS.center,
    position = POSITIONS.above,
    fallbackPositions = [],
    offset,
    coverTarget = false,
    strategy = 'absolute',
    matchTargetSize,
    positioningRef,
  } = options;

  const align = normalizeAlign(alignInput);

  const { mainAxis, crossAxis } = resolveOffset(offset);
  const coverAlignment = coverTarget ? getCoverSelfAlignment(position, align) : null;

  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [imperativeTarget, setImperativeTarget] = React.useState<HTMLElement | null>(null);
  const effectiveTarget = imperativeTarget ?? resolveElementRef(customTarget) ?? triggerEl;

  const anchorName = useId('--popover-anchor-');
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);

  const { targetDocument } = useFluent();

  const fallbackAreas = React.useMemo(() => fallbackPositions.map(shorthandToPositionArea), [fallbackPositions]);

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: (el: HTMLElement | null) => {
        setImperativeTarget(el);
      },
      updatePosition: () => undefined,
    }),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    effectiveTarget?.style.setProperty('anchor-name', anchorName);
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
    ],
  );

  usePlacementObserver(containerEl, effectiveTarget, targetDocument, coverTarget);

  return { targetRef, containerRef };
}
