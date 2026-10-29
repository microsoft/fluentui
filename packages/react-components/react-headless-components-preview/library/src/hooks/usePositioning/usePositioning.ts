'use client';

import * as React from 'react';
import { useId, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { usePositioning as useV9Positioning } from '@fluentui/react-positioning';
import type {
  PositioningImperativeRef,
  PositioningShorthandValue,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';
import type { PositioningProps, PositioningReturn } from './types';
import { POSITIONS, ALIGNMENTS, POSITION_AREA_MAP } from './constants';
import { getPlacementString, normalizeAlign } from './utils/placement';
import { applyOffset, getCoverSelfAlignment, resolveElementRef, resolveOffset, shorthandToPositionArea } from './utils';
import { usePlacementObserver } from './usePlacementObserver';
import { preservePositioningStyles } from './utils/preservePositioningStyles';

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
    autoSize,
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
  const isAutoSizing = Boolean(autoSize);

  const { mainAxis, crossAxis } = resolveOffset(offset);
  const coverAlignment = React.useMemo(
    () => (coverTarget ? getCoverSelfAlignment(position, align) : null),
    [coverTarget, position, align],
  );

  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [imperativeTarget, setImperativeTarget] = React.useState<TargetElement | null>(null);
  const effectiveTarget = resolveElementRef(imperativeTarget ?? customTarget) ?? triggerEl;
  const floatingImperativeRef = React.useRef<PositioningImperativeRef>(null);

  const anchorName = `--${useId('popover-anchor-')}`;
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);

  const { targetDocument, dir } = useFluent();

  const fallbackAreas = React.useMemo(() => fallbackPositions.map(shorthandToPositionArea), [fallbackPositions]);

  const requestPlacementUpdate = usePlacementObserver(
    containerEl,
    effectiveTarget,
    targetDocument,
    coverTarget || isAutoSizing,
  );

  // Reuse v9's measurement/flip/size ordering only for opt-in autosizing.
  const floatingPositioning = useV9Positioning({
    ...options,
    enabled: isAutoSizing,
    position,
    align: alignInput,
    strategy,
    target: imperativeTarget ?? customTarget,
    positioningRef: floatingImperativeRef,
    onPositioningEnd: event => {
      const physicalPlacement = event.detail.placement;
      const resolvedPosition = physicalPlacement.startsWith('top')
        ? POSITIONS.above
        : physicalPlacement.startsWith('bottom')
        ? POSITIONS.below
        : physicalPlacement.startsWith(dir === 'rtl' ? 'right' : 'left')
        ? POSITIONS.before
        : POSITIONS.after;
      const resolvedAlignment = physicalPlacement.endsWith('-start')
        ? ALIGNMENTS.start
        : physicalPlacement.endsWith('-end')
        ? ALIGNMENTS.end
        : ALIGNMENTS.center;
      containerEl?.setAttribute('data-placement', getPlacementString(resolvedPosition, resolvedAlignment));
    },
  });
  const floatingTargetRef = useMergedRefs<HTMLElement>(floatingPositioning.targetRef);
  const floatingContainerRef = useMergedRefs<HTMLElement>(floatingPositioning.containerRef);

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: (el: TargetElement | null) => {
        setImperativeTarget(el);
      },
      updatePosition: () => (isAutoSizing ? floatingImperativeRef.current?.updatePosition() : requestPlacementUpdate()),
    }),
    [isAutoSizing, requestPlacementUpdate],
  );

  useIsomorphicLayoutEffect(() => {
    if (!effectiveTarget || isAutoSizing) {
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
  }, [effectiveTarget, anchorName, isAutoSizing]);

  const targetRef: React.RefCallback<HTMLElement> = React.useCallback(
    node => {
      setTriggerEl(node);
      floatingTargetRef(node);
    },
    [floatingTargetRef],
  );

  const restoreStyles = React.useRef<(() => void) | undefined>(undefined);
  const containerRef: React.RefCallback<HTMLElement> = React.useCallback(
    node => {
      floatingContainerRef(null);
      restoreStyles.current?.();
      restoreStyles.current = undefined;
      setContainerEl(node);

      if (!node) {
        return;
      }

      restoreStyles.current = preservePositioningStyles(node);
      node.style.setProperty('inset', 'auto');
      node.setAttribute('data-placement', placement);

      if (autoSize) {
        floatingContainerRef(node);
        return;
      }

      node.style.setProperty('position', strategy);
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
      autoSize,
      floatingContainerRef,
    ],
  );

  return { targetRef, containerRef };
}
