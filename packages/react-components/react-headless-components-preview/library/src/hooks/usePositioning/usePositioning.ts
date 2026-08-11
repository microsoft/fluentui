'use client';

import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type {
  PositionManager,
  PositioningImperativeRef,
  PositioningShorthandValue,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';

import type { PositioningProps, PositioningReturn } from './types';
import type { PositioningReturnInternal } from './internalTypes';
import { POSITIONS, ALIGNMENTS, POSITION_AREA_MAP } from './constants';
import {
  getDefaultFallbackPositions,
  getLogicalPlacement,
  getPlacementString,
  normalizeAlign,
} from './utils/placement';
import { applyOffset, getCoverSelfAlignment, resolveElementRef, resolveOffset, shorthandToPositionArea } from './utils';
import { usePlacementObserver } from './usePlacementObserver';
import { usePositioningRuntime } from './positioningRuntime';

export type TargetElement = HTMLElement | PositioningVirtualElement;

const DEFAULT_FLIP = ['flip-block', 'flip-inline', 'flip-block flip-inline'];
const EMPTY_FALLBACK_POSITIONS: PositioningShorthandValue[] = [];

const NATIVE_STYLE_PROPERTIES = [
  'position',
  'inset',
  'margin',
  'margin-block-start',
  'margin-block-end',
  'margin-inline-start',
  'margin-inline-end',
  'width',
  'position-anchor',
  'position-area',
  'position-try-fallbacks',
  'place-self',
  'align-self',
  'justify-self',
] as const;

const FALLBACK_STYLE_PROPERTIES = [
  'position',
  'inset',
  'margin',
  'left',
  'top',
  'transform',
  'visibility',
  'width',
  '--fui-match-target-size',
] as const;

const FALLBACK_ATTRIBUTES = [
  'data-placement',
  'data-positioning-runtime',
  'data-popper-placement',
  'data-popper-is-intersecting',
  'data-popper-escaped',
  'data-popper-reference-hidden',
] as const;

const captureStyleProperties = (element: HTMLElement, properties: readonly string[]): (() => void) => {
  const previous = properties.map(property => [property, element.style.getPropertyValue(property)] as const);

  return () => {
    for (const [property, value] of previous) {
      if (value) {
        element.style.setProperty(property, value);
      } else {
        element.style.removeProperty(property);
      }
    }
  };
};

const captureAttributes = (element: HTMLElement, attributes: readonly string[]): (() => void) => {
  const previous = attributes.map(attribute => [attribute, element.getAttribute(attribute)] as const);

  return () => {
    for (const [attribute, value] of previous) {
      if (value === null) {
        element.removeAttribute(attribute);
      } else {
        element.setAttribute(attribute, value);
      }
    }
  };
};

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
  const [imperativeTarget, setImperativeTarget] = React.useState<TargetElement | null>(null);
  const fallbackManagerRef = React.useRef<PositionManager | null>(null);

  const effectiveTarget = imperativeTarget ?? customTarget ?? triggerEl;
  const nativeTarget = resolveElementRef(effectiveTarget);
  const anchorName = `--${useId('popover-anchor-')}`;
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);

  const { dir, targetDocument } = useFluent();
  const runtime = usePositioningRuntime(targetDocument);
  const useNativePositioning = runtime.mode === 'ssr' || runtime.mode === 'native';

  if (runtime.mode === 'fallback-error') {
    throw runtime.error;
  }

  const fallbackAreas = React.useMemo(() => fallbackPositions.map(shorthandToPositionArea), [fallbackPositions]);
  const fallbackPlacements = React.useMemo(
    () => (fallbackPositions.length > 0 ? fallbackPositions : getDefaultFallbackPositions(position, align)),
    [align, fallbackPositions, position],
  );

  const requestPlacementUpdate = usePlacementObserver(
    containerEl,
    nativeTarget,
    targetDocument,
    coverTarget || !useNativePositioning,
  );

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: (target: TargetElement | null) => {
        setImperativeTarget(target);
      },
      updatePosition: () => {
        if (runtime.mode === 'fallback-ready') {
          fallbackManagerRef.current?.updatePosition();
        } else {
          requestPlacementUpdate();
        }
      },
    }),
    [requestPlacementUpdate, runtime.mode],
  );

  useIsomorphicLayoutEffect(() => {
    if (!useNativePositioning || !nativeTarget) {
      return;
    }

    const names = readAnchorNames(nativeTarget);
    if (!names.includes(anchorName)) {
      nativeTarget.style.setProperty('anchor-name', [...names, anchorName].join(', '));
    }

    return () => {
      const remaining = readAnchorNames(nativeTarget).filter(name => name !== anchorName);
      if (remaining.length > 0) {
        nativeTarget.style.setProperty('anchor-name', remaining.join(', '));
      } else {
        nativeTarget.style.removeProperty('anchor-name');
      }
    };
  }, [anchorName, nativeTarget, useNativePositioning]);

  useIsomorphicLayoutEffect(() => {
    if (!useNativePositioning || !containerEl) {
      return;
    }

    const restoreStyles = captureStyleProperties(containerEl, NATIVE_STYLE_PROPERTIES);
    const previousPlacement = containerEl.getAttribute('data-placement');
    const previousRuntime = containerEl.getAttribute('data-positioning-runtime');

    containerEl.style.setProperty('position', strategy);
    containerEl.style.setProperty('inset', 'auto');
    containerEl.style.setProperty('margin', '0');

    applyOffset(containerEl, position, mainAxis, crossAxis);

    if (matchTargetSize === 'width') {
      containerEl.style.setProperty('width', 'anchor-size(width)');
    } else {
      containerEl.style.removeProperty('width');
    }

    containerEl.style.setProperty('position-anchor', anchorName);
    containerEl.setAttribute('data-placement', placement);
    containerEl.setAttribute('data-positioning-runtime', 'native');

    if (coverAlignment) {
      containerEl.style.setProperty('position-area', 'center');
      containerEl.style.setProperty('align-self', coverAlignment.alignSelf);
      containerEl.style.setProperty('justify-self', coverAlignment.justifySelf);
      containerEl.style.removeProperty('position-try-fallbacks');
    } else {
      containerEl.style.setProperty('position-area', positionArea);

      if (align === ALIGNMENTS.center) {
        containerEl.style.setProperty('place-self', 'anchor-center');
      } else {
        containerEl.style.removeProperty('place-self');
        containerEl.style.removeProperty('align-self');
        containerEl.style.removeProperty('justify-self');
      }

      if (pinned) {
        containerEl.style.removeProperty('position-try-fallbacks');
      } else if (fallbackAreas.length > 0) {
        containerEl.style.setProperty('position-try-fallbacks', fallbackAreas.join(', '));
      } else {
        containerEl.style.setProperty('position-try-fallbacks', DEFAULT_FLIP.join(', '));
      }
    }

    return () => {
      restoreStyles();

      if (previousPlacement === null) {
        containerEl.removeAttribute('data-placement');
      } else {
        containerEl.setAttribute('data-placement', previousPlacement);
      }

      if (previousRuntime === null) {
        containerEl.removeAttribute('data-positioning-runtime');
      } else {
        containerEl.setAttribute('data-positioning-runtime', previousRuntime);
      }
    };
  }, [
    align,
    anchorName,
    containerEl,
    coverAlignment,
    crossAxis,
    fallbackAreas,
    mainAxis,
    matchTargetSize,
    pinned,
    placement,
    position,
    positionArea,
    strategy,
    useNativePositioning,
  ]);

  useIsomorphicLayoutEffect(() => {
    if ((runtime.mode !== 'fallback-idle' && runtime.mode !== 'fallback-loading') || !containerEl) {
      return;
    }

    const restoreStyles = captureStyleProperties(containerEl, FALLBACK_STYLE_PROPERTIES);
    const restoreAttributes = captureAttributes(containerEl, FALLBACK_ATTRIBUTES);

    containerEl.style.setProperty('position', strategy);
    containerEl.style.setProperty('inset', 'auto');
    containerEl.style.setProperty('margin', '0');
    containerEl.style.setProperty('visibility', 'hidden');
    containerEl.setAttribute('data-placement', placement);
    containerEl.setAttribute('data-positioning-runtime', 'loading');

    return () => {
      restoreStyles();
      restoreAttributes();
    };
  }, [containerEl, placement, runtime.mode, strategy]);

  useIsomorphicLayoutEffect(() => {
    if (runtime.mode !== 'fallback-ready' || !containerEl || !effectiveTarget) {
      return;
    }

    const restoreStyles = captureStyleProperties(containerEl, FALLBACK_STYLE_PROPERTIES);
    const restoreAttributes = captureAttributes(containerEl, FALLBACK_ATTRIBUTES);
    const restoreArrowStyles = arrowEl ? captureStyleProperties(arrowEl, ['left', 'top']) : undefined;
    const previousVisibility = containerEl.style.visibility;

    containerEl.style.setProperty('position', strategy);
    containerEl.style.setProperty('inset', 'auto');
    containerEl.style.setProperty('margin', '0');
    containerEl.style.setProperty('visibility', 'hidden');
    containerEl.setAttribute('data-placement', placement);
    containerEl.setAttribute('data-positioning-runtime', 'fallback');

    if (matchTargetSize === 'width') {
      containerEl.style.removeProperty('width');
    }

    const manager = runtime.runtime.createPositioningManager({
      align: alignInput,
      arrow: arrowEl,
      container: containerEl,
      coverTarget,
      dir,
      fallbackPositions: fallbackPlacements,
      matchTargetSize,
      offset: { mainAxis, crossAxis },
      onPositioningEnd: event => {
        const resolvedPlacement = getLogicalPlacement(event.detail.placement, dir);
        if (resolvedPlacement) {
          containerEl.setAttribute('data-placement', resolvedPlacement);
        }
        containerEl.style.visibility = previousVisibility;
      },
      pinned: pinned || coverTarget,
      position,
      strategy,
      target: effectiveTarget,
      targetDocument,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_disableShift: true,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_flipFallbackStrategy: 'initialPlacement',
      useTransform: false,
    });

    fallbackManagerRef.current = manager;

    return () => {
      manager.dispose();
      restoreArrowStyles?.();
      restoreStyles();
      restoreAttributes();

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
    pinned,
    placement,
    position,
    runtime,
    strategy,
    targetDocument,
  ]);

  const targetRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setTriggerEl(node);
  }, []);

  const containerRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setContainerEl(node);
  }, []);

  const arrowRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setArrowEl(node);
  }, []);

  return { targetRef, containerRef, arrowRef } as PositioningReturnInternal;
}
