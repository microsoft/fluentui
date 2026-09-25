'use client';

import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { PositioningShorthandValue, PositioningVirtualElement } from '@fluentui/react-positioning';
import type { PositioningProps } from './types';
import { POSITIONS, ALIGNMENTS, POSITION_AREA_MAP } from './constants';
import { getPlacementString, normalizeAlign } from './utils/placement';
import { applyOffset, getCoverSelfAlignment, resolveElementRef, resolveOffset, shorthandToPositionArea } from './utils';
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

export type UseCssAnchorPositioningOptions = Pick<
  PositioningProps,
  | 'align'
  | 'coverTarget'
  | 'fallbackPositions'
  | 'matchTargetSize'
  | 'offset'
  | 'pinned'
  | 'position'
  | 'strategy'
  | 'target'
> & {
  /** When false, the hook keeps its state but writes nothing to the DOM. */
  enabled: boolean;
};

export type UseCssAnchorPositioningReturn = {
  targetRef: React.RefCallback<HTMLElement>;
  containerRef: React.RefCallback<HTMLElement>;
  setTarget: (target: TargetElement | null) => void;
  updatePosition: () => void;
};

/**
 * Positions a surface with native CSS anchor positioning.
 */
export function useCssAnchorPositioning(options: UseCssAnchorPositioningOptions): UseCssAnchorPositioningReturn {
  const {
    enabled,
    pinned,
    target: customTarget = null,
    align: alignInput = ALIGNMENTS.center,
    position = POSITIONS.above,
    fallbackPositions = EMPTY_FALLBACK_POSITIONS,
    offset,
    coverTarget = false,
    strategy = 'fixed',
    matchTargetSize,
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
  const effectiveTarget = enabled ? imperativeTarget ?? resolveElementRef(customTarget) ?? triggerEl : null;

  const anchorName = `--${useId('popover-anchor-')}`;
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);

  const { targetDocument } = useFluent();

  const fallbackAreas = React.useMemo(() => fallbackPositions.map(shorthandToPositionArea), [fallbackPositions]);

  const updatePosition = usePlacementObserver(containerEl, effectiveTarget, targetDocument, coverTarget || !enabled);

  const setTarget = React.useCallback((el: TargetElement | null) => {
    setImperativeTarget(resolveElementRef(el));
  }, []);

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

      if (!node || !enabled) {
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
      enabled,
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

  return React.useMemo(
    () => ({ targetRef, containerRef, setTarget, updatePosition }),
    [targetRef, containerRef, setTarget, updatePosition],
  );
}
