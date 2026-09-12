'use client';

import * as React from 'react';
import { canUseDOM, useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type {
  PositioningImperativeRef,
  PositioningProps,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';
import type { PositioningReturn } from './types';
import { applyAnchorPositioning } from './applyAnchorPositioning';
import { preloadFloatingImpl, scheduleApply } from './lazyApply';

let supportsAnchorCached: boolean | undefined;

type TargetElement = HTMLElement | PositioningVirtualElement;

// Set to `true` to force the floating-ui fallback path even in browsers that
// support CSS Anchor Positioning. Native detection runs when this is `false`.
const FORCE_FALLBACK_FOR_DEBUG = false;

/**
 * Detects support for CSS Anchor Positioning. The result is stable per page
 * session, so the first call is memoized at module level.
 */
function supportsAnchorPositioning(): boolean {
  if (FORCE_FALLBACK_FOR_DEBUG && process.env.NODE_ENV !== 'test') {
    return false;
  }

  if (supportsAnchorCached !== undefined) {
    return supportsAnchorCached;
  }

  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    supportsAnchorCached = false;
  } else {
    supportsAnchorCached = CSS.supports('anchor-name', '--x');
  }

  return supportsAnchorCached;
}

function isHTMLElement(target: TargetElement): target is HTMLElement {
  return 'nodeType' in target;
}

/**
 * CSS Anchor Positioning is the default. These options require information or
 * behavior that the native API does not currently expose, so they opt into the
 * lazy floating-ui implementation.
 */
function requiresFloatingUI(options: PositioningProps, target?: TargetElement | null): boolean {
  return Boolean(
    (target && !isHTMLElement(target)) ||
      typeof options.offset === 'function' ||
      options.autoSize ||
      options.flipBoundary ||
      options.overflowBoundary ||
      options.overflowBoundaryPadding !== undefined ||
      options.useTransform ||
      options.arrowPadding !== undefined ||
      options.onPositioningEnd ||
      options.disableUpdateOnResize ||
      options.shiftToCoverTarget,
  );
}

function getPositioningMode(options: PositioningProps, target?: TargetElement | null): 'anchor' | 'floating' {
  return supportsAnchorPositioning() && !requiresFloatingUI(options, target) ? 'anchor' : 'floating';
}

/**
 * Eagerly loads floating-ui when the browser or requested options require the
 * fallback. The default CSS Anchor implementation is already available.
 * Safe to call during SSR.
 */
export function preloadPositioning(options: PositioningProps = {}): Promise<unknown> {
  if (!canUseDOM()) {
    return Promise.resolve();
  }

  return getPositioningMode(options, options.target) === 'anchor' ? Promise.resolve() : preloadFloatingImpl();
}

/**
 * Resets module-level caches. For tests only.
 *
 * @internal
 */
export function resetPositioningForTests(): void {
  supportsAnchorCached = undefined;
}

/**
 * Anchors a surface to a target element. Prefers CSS Anchor Positioning when
 * supported and falls back to a dynamically imported floating-ui implementation.
 */
export function usePositioning(options: PositioningProps): PositioningReturn {
  'use no memo';

  const { dir, targetDocument } = useFluent();
  const anchorName = `--${useId('popover-anchor-')}`;

  const triggerElRef = React.useRef<HTMLElement | null>(null);
  const containerElRef = React.useRef<HTMLElement | null>(null);
  const arrowElRef = React.useRef<HTMLElement | null>(null);
  const imperativeTargetRef = React.useRef<TargetElement | null>(null);

  // Bumped whenever a ref changes or an imperative update is requested.
  const [refsVersion, setRefsVersion] = React.useState(0);
  const bumpRefsVersion = React.useCallback(() => {
    setRefsVersion(version => version + 1);
  }, []);

  const targetRef = React.useCallback<React.RefCallback<HTMLElement>>(
    node => {
      if (triggerElRef.current !== node) {
        triggerElRef.current = node;
        bumpRefsVersion();
      }
    },
    [bumpRefsVersion],
  );

  const containerRef = React.useCallback<React.RefCallback<HTMLElement>>(
    node => {
      if (containerElRef.current !== node) {
        containerElRef.current = node;
        bumpRefsVersion();
      }
    },
    [bumpRefsVersion],
  );

  const arrowRef = React.useCallback<React.RefCallback<HTMLElement>>(
    node => {
      if (arrowElRef.current !== node) {
        arrowElRef.current = node;
        bumpRefsVersion();
      }
    },
    [bumpRefsVersion],
  );

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    options.positioningRef,
    () => ({
      setTarget: (element: HTMLElement | PositioningVirtualElement | null) => {
        if (imperativeTargetRef.current !== element) {
          imperativeTargetRef.current = element;
          bumpRefsVersion();
        }
      },
      updatePosition: bumpRefsVersion,
    }),
    [bumpRefsVersion],
  );

  const customTarget = options.target ?? null;
  const {
    position,
    align,
    fallbackPositions,
    offset,
    coverTarget,
    strategy,
    matchTargetSize,
    pinned,
    arrowPadding,
    autoSize,
    flipBoundary,
    overflowBoundary,
    overflowBoundaryPadding,
    useTransform,
    onPositioningEnd,
    disableUpdateOnResize,
    shiftToCoverTarget,
  } = options;

  // Snapshot only fields that affect positioning so unrelated options object
  // identity changes do not re-run the layout effect.
  const positioningOptions = React.useMemo<PositioningProps>(
    () => ({
      position,
      align,
      fallbackPositions,
      offset,
      coverTarget,
      strategy,
      matchTargetSize,
      pinned,
      arrowPadding,
      autoSize,
      flipBoundary,
      overflowBoundary,
      overflowBoundaryPadding,
      useTransform,
      onPositioningEnd,
      disableUpdateOnResize,
      shiftToCoverTarget,
    }),
    [
      position,
      align,
      fallbackPositions,
      offset,
      coverTarget,
      strategy,
      matchTargetSize,
      pinned,
      arrowPadding,
      autoSize,
      flipBoundary,
      overflowBoundary,
      overflowBoundaryPadding,
      useTransform,
      onPositioningEnd,
      disableUpdateOnResize,
      shiftToCoverTarget,
    ],
  );

  useIsomorphicLayoutEffect(() => {
    const container = containerElRef.current;
    const target = imperativeTargetRef.current ?? customTarget ?? triggerElRef.current;

    if (!container || !target) {
      return;
    }

    const arrow = arrowElRef.current;
    const mode = getPositioningMode(positioningOptions, target);
    const dispose =
      mode === 'anchor' && isHTMLElement(target)
        ? applyAnchorPositioning({
            target,
            container,
            arrow,
            anchorName,
            options: positioningOptions,
            targetDocument,
            isRtl: dir === 'rtl',
          })
        : scheduleApply({
            target,
            container,
            arrow,
            options: positioningOptions,
            isRtl: dir === 'rtl',
          });

    return () => {
      dispose();
    };
  }, [refsVersion, customTarget, anchorName, dir, targetDocument, positioningOptions]);

  return { targetRef, containerRef, arrowRef };
}
