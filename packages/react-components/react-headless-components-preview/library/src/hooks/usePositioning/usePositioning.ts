'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { PositioningProps, PositioningReturn, PositioningImperativeRef } from './types';
import { POSITION_AREA_MAP, ALIGNMENTS, POSITIONS } from './constants';
import { getPlacementString } from './placement';
import { resolveElementRef, resolveOffset } from './resolvers';
import { ensureFallbackStyles, shorthandToFallbackName } from './fallbackStyles';
import { applyAutoSize, applyOffsetStyles, applyPositionAreaStyles, getCoverSelfAlignment } from './styleHelpers';
import { useAnchorName } from './useAnchorName';
import { usePlacementSync } from './usePlacementSync';
import { useAutoSizeBoundary } from './useAutoSizeBoundary';

function useImperativeAnchor(
  positioningRef: React.Ref<PositioningImperativeRef> | undefined,
  anchorName: string,
): void {
  const imperativeTargetRef = React.useRef<HTMLElement | null>(null);
  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: el => {
        if (imperativeTargetRef.current && imperativeTargetRef.current !== el) {
          imperativeTargetRef.current.style.removeProperty('anchor-name');
        }
        imperativeTargetRef.current = el;
        if (el) {
          el.style.setProperty('anchor-name', anchorName);
        }
      },
      updatePosition: () => undefined,
    }),
    [anchorName],
  );
}

/**
 * Positions a container element relative to a target (anchor) using the
 * native CSS anchor positioning API. Returns ref callbacks for the target,
 * container, and arrow; caller wires them to the respective elements.
 */
export function usePositioning(options: PositioningProps): PositioningReturn {
  const position = options.position ?? POSITIONS.above;
  const align = options.align ?? ALIGNMENTS.center;
  const coverTarget = options.coverTarget ?? false;
  const autoSize = options.autoSize ?? false;
  const strategy = options.strategy ?? 'fixed';
  const pinned = options.pinned ?? false;
  const {
    offset,
    target: customTarget = null,
    matchTargetSize,
    positioningRef,
    fallbackPositions,
    overflowBoundary,
  } = options;

  const { targetDocument } = useFluent();

  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [targetEl, setTargetEl] = React.useState<HTMLElement | null>(null);

  const effectiveTarget = resolveElementRef(customTarget) ?? triggerElement;
  const anchorName = useAnchorName(effectiveTarget);
  useImperativeAnchor(positioningRef, anchorName);

  React.useEffect(() => {
    setTargetEl(effectiveTarget);
  }, [effectiveTarget]);

  const { mainAxis, crossAxis } = resolveOffset(offset);
  const positionArea = coverTarget ? 'center' : POSITION_AREA_MAP[position][align];
  const coverAlignment = coverTarget ? getCoverSelfAlignment(position, align) : null;
  const placement = getPlacementString(position, align);

  const targetRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setTriggerElement(node);
  }, []);

  const containerRef: React.RefCallback<HTMLElement> = React.useCallback(
    node => {
      setContainerEl(node);
      if (!node) {
        return;
      }

      const surface = node;

      surface.style.setProperty('position', strategy);
      surface.style.setProperty('position-anchor', anchorName);
      surface.setAttribute('data-placement', placement);

      if (coverAlignment) {
        surface.style.setProperty('position-area', positionArea);
        surface.style.setProperty('align-self', coverAlignment.alignSelf);
        surface.style.setProperty('justify-self', coverAlignment.justifySelf);
      } else {
        if (pinned) {
          surface.style.removeProperty('position-try-fallbacks');
        } else if (fallbackPositions && fallbackPositions.length > 0) {
          ensureFallbackStyles(targetDocument);
          surface.style.setProperty(
            'position-try-fallbacks',
            fallbackPositions.map(shorthandToFallbackName).join(', '),
          );
        } else {
          surface.style.setProperty('position-try-fallbacks', 'flip-block, flip-inline');
        }
        applyPositionAreaStyles(surface, positionArea, position, align);
      }

      if (matchTargetSize === 'width') {
        surface.style.setProperty('width', 'anchor-size(width)');
      }

      applyOffsetStyles(surface, position, mainAxis, crossAxis);
      applyAutoSize(surface, autoSize, position);
    },
    [
      anchorName,
      positionArea,
      coverAlignment,
      placement,
      position,
      align,
      mainAxis,
      crossAxis,
      autoSize,
      strategy,
      matchTargetSize,
      pinned,
      fallbackPositions,
      targetDocument,
    ],
  );

  const arrowRef: React.RefCallback<HTMLElement> = React.useCallback(() => {
    // Arrow placement is consumer-owned CSS keyed off `[data-placement]`.
  }, []);

  usePlacementSync({
    containerEl,
    targetEl,
    coverTarget,
    pinned,
    useCssFallbacks: !!fallbackPositions && fallbackPositions.length > 0,
    position,
    align,
    mainOffset: mainAxis,
    targetDocument,
  });

  useAutoSizeBoundary({
    autoSize,
    overflowBoundary,
    containerEl,
    targetEl,
    position,
    align,
    targetDocument,
  });

  return { targetRef, containerRef, arrowRef };
}
