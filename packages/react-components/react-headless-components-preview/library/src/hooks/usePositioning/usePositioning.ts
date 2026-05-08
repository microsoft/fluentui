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
import { resolveElementRef } from './utils';
import { preloadAnchorImpl, preloadFloatingImpl, scheduleApply } from './lazyApply';

let supportsAnchorCached: boolean | undefined;
// Set to `true` to force the floating-ui fallback path even in browsers that
// support CSS Anchor Positioning. Useful for local debugging of the fallback
// chunk; native detection runs when this is `false`.
const FORCE_FALLBACK_FOR_DEBUG = false;

/**
 * Detects support for CSS Anchor Positioning. The result is stable per page
 * session, so the first call is memoised at module level.
 */
function supportsAnchorPositioning(): boolean {
  // Honour the debug toggle only outside the test environment, so the test
  // suite can still exercise both branches via `mockCssSupports` regardless
  // of how this flag is set for browser debugging.
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

/**
 * Eagerly load the positioning chunk that this browser will end up using —
 * the CSS Anchor Positioning helper when supported, otherwise the floating-ui
 * fallback. Useful for warming the bundle before the first popover/tooltip
 * opens (e.g. on app boot, or on hover-intent over a trigger). Safe to call
 * during SSR — resolves immediately without fetching anything.
 */
export function preloadPositioning(): Promise<unknown> {
  if (!canUseDOM()) {
    return Promise.resolve();
  }
  return supportsAnchorPositioning() ? preloadAnchorImpl() : preloadFloatingImpl();
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
 * the browser supports it, and falls back to a dynamically-imported
 * floating-ui implementation otherwise. Each strategy ships in its own
 * webpack chunk and is fetched on first use, so a browser only ever loads
 * the path it needs.
 *
 * The hook is fully synchronous and always calls the same set of React
 * hooks — all positioning work happens imperatively inside a single layout
 * effect. The first time a strategy is used, its chunk is fetched via
 * dynamic `import()`; until it resolves the surface is unstyled but the
 * rest of the tree renders normally. Use `preloadPositioning()` to warm
 * the chunk proactively (e.g. on app boot or hover-intent over a trigger).
 */
export function usePositioning(options: PositioningProps): PositioningReturn {
  'use no memo';

  const { targetDocument } = useFluent();

  const anchorName = `--${useId('popover-anchor-')}`;

  const triggerElRef = React.useRef<HTMLElement | null>(null);
  const containerElRef = React.useRef<HTMLElement | null>(null);
  const arrowElRef = React.useRef<HTMLElement | null>(null);
  const imperativeTargetRef = React.useRef<HTMLElement | null>(null);

  // Bumped whenever a ref changes — re-runs the positioning effect since refs
  // alone don't cause renders.
  const [refsVersion, setRefsVersion] = React.useState(0);
  const bumpRefsVersion = React.useCallback(() => {
    setRefsVersion(v => v + 1);
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
      setTarget: (el: HTMLElement | PositioningVirtualElement | null) => {
        const resolved = resolveElementRef(el);
        if (imperativeTargetRef.current !== resolved) {
          imperativeTargetRef.current = resolved;
          bumpRefsVersion();
        }
      },
      updatePosition: () => undefined,
    }),
    [bumpRefsVersion],
  );

  const customTarget = options.target ?? null;
  const { position, align, fallbackPositions, offset, coverTarget, strategy, matchTargetSize, pinned, arrowPadding } =
    options;

  // Snapshot of the option fields that actually drive positioning. Stable
  // identity until one of those fields changes, so the layout effect doesn't
  // re-run on unrelated `options` identity changes (e.g. a parent passing a
  // new object literal each render).
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
    }),
    [position, align, fallbackPositions, offset, coverTarget, strategy, matchTargetSize, pinned, arrowPadding],
  );

  useIsomorphicLayoutEffect(() => {
    const container = containerElRef.current;
    const target = imperativeTargetRef.current ?? resolveElementRef(customTarget) ?? triggerElRef.current;

    if (!container || !target) {
      return;
    }

    // Hide the container until positioning is fully loaded and committed.
    // The gap can be many frames: the strategy chunk loads via dynamic
    // `import()`, and on the floating-ui path `computePosition` is also
    // async. Without this, the surface paints at its default location for
    // however long the load takes and then snaps into place. The apply
    // helpers clear `visibility` themselves the moment they've written the
    // committed coordinates.
    container.style.setProperty('visibility', 'hidden');

    const arrow = arrowElRef.current;
    const dispose =
      canUseDOM() && supportsAnchorPositioning()
        ? scheduleApply('anchor', {
            target,
            container,
            arrow,
            anchorName,
            options: positioningOptions,
            targetDocument,
          })
        : scheduleApply('floating', { target, container, arrow, options: positioningOptions });

    return () => {
      dispose();
      // Safety net for the case where the apply never committed (chunk still
      // loading at unmount, computePosition rejected, etc.) so the surface
      // doesn't get stuck invisible if it lingers in the DOM.
      container.style.removeProperty('visibility');
    };
  }, [refsVersion, customTarget, anchorName, targetDocument, positioningOptions]);

  return { targetRef, containerRef, arrowRef };
}
