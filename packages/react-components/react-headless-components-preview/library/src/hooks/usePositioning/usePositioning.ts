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
import { getPlacementString, normalizeAlign } from './utils/placement';
import {
  applyOffset,
  getCoverSelfAlignment,
  resolveElementRef,
  resolveOffset,
  shorthandToPositionArea,
  supportsAnchoredContainerQueries,
} from './utils';
import { usePlacementObserver } from './usePlacementObserver';

export type TargetElement = HTMLElement | PositioningVirtualElement;

const DEFAULT_FLIP = ['flip-block', 'flip-inline', 'flip-block flip-inline'];
const EMPTY_FALLBACK_POSITIONS: PositioningShorthandValue[] = [];

export function usePositioning(options: PositioningProps): PositioningReturn {
  const {
    pinned,
    target: customTarget = null,
    align: alignInput = ALIGNMENTS.center,
    position = POSITIONS.above,
    fallbackPositions = EMPTY_FALLBACK_POSITIONS,
    offset,
    coverTarget = false,
    strategy = 'absolute',
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
  const [imperativeTarget, setImperativeTarget] = React.useState<HTMLElement | null>(null);
  const effectiveTarget = imperativeTarget ?? resolveElementRef(customTarget) ?? triggerEl;

  const anchorName = `--${useId('popover-anchor-')}`;
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);

  const { targetDocument } = useFluent();

  const fallbackAreas = React.useMemo(() => fallbackPositions.map(shorthandToPositionArea), [fallbackPositions]);

  const requestPlacementUpdate = usePlacementObserver(containerEl, effectiveTarget, targetDocument, coverTarget);

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
    effectiveTarget.style.setProperty('anchor-name', anchorName);
    return () => {
      effectiveTarget.style.removeProperty('anchor-name');
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

      node.setAttribute('data-position', position);
      node.setAttribute('data-align', align);

      const win = node.ownerDocument?.defaultView;

      if (win && supportsAnchoredContainerQueries(win)) {
        // Chrome 143+: opt into `@container anchored(fallback: …)` queries.
        node.style.setProperty('container-type', 'anchored');
        node.removeAttribute('data-placement');
      } else {
        node.style.removeProperty('container-type');
        node.setAttribute('data-placement', placement);
      }

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

  return { targetRef, containerRef };
}
