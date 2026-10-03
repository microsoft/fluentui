'use client';

/*
 * React Compiler cannot analyse this module.
 *
 * The engine is selected at runtime and invoked as a hook — `(delegate ?? useCssAnchorEngine)(...)`
 * — which the compiler cannot trace, so it bails on the whole function and reports the bail at each
 * manual memoization site. Verified by substituting a static call, after which the rule passes.
 *
 * The consequence is that this hook is not auto-optimised; its memoization is explicit and correct,
 * so behaviour is unaffected. Dynamic dispatch is the mechanism that lets a component delegate
 * placement without threading a rendered element through every state and render function, so this
 * is a deliberate trade rather than an oversight.
 */
/* eslint-disable react-hooks/preserve-manual-memoization */

import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { PositioningProps as CanonicalPositioningProps } from '@fluentui/react-positioning';

import type { PositioningEngine, PositioningProps, PositioningReturn } from './types';
import { useCssAnchorPositioning } from './useCssAnchorPositioning';
import { toHeadlessPlacement } from './utils/toHeadlessPlacement';

/**
 * The built-in engine, adapted to the `PositioningEngine` signature so the dispatcher has a single
 * call site regardless of which engine is active.
 *
 * Module scope, so its identity is stable.
 */
const useCssAnchorEngine: PositioningEngine = options => useCssAnchorPositioning(options as PositioningProps);

/**
 * Positions a surface, delegating to an injected engine when one is supplied.
 *
 * Exactly one engine owns placement. The engine is invoked with options the component has already
 * merged, so configuration derived internally — a submenu's placement, a pointer-derived target —
 * reaches it without the consumer restating it.
 *
 * Two concerns stay with this hook regardless of engine, because they are properties of the
 * surface rather than of the positioner: the top-layer reset, and reporting resolved placement
 * through `data-placement`.
 */
export function usePositioning(
  options: PositioningProps & { engine?: 'default' | PositioningEngine },
): PositioningReturn {
  const { engine, ...positioningOptions } = options;
  const delegate = typeof engine === 'function' ? engine : undefined;

  const consumerOnPositioningEnd = (positioningOptions as CanonicalPositioningProps).onPositioningEnd;

  /**
   * Mirrors the engine's resolved placement into the headless vocabulary.
   *
   * Uses the public `onPositioningEnd` option rather than observing the engine's own attribute, so
   * nothing here depends on a particular engine's internals. The event is dispatched on the
   * surface, so `currentTarget` is the element to annotate — no ref needed.
   */
  const handlePositioningEnd = React.useCallback<NonNullable<CanonicalPositioningProps['onPositioningEnd']>>(
    event => {
      const container = event.currentTarget as HTMLElement | null;
      const placement = toHeadlessPlacement(event.detail.placement);

      if (container && placement) {
        container.setAttribute('data-placement', placement);
      }

      consumerOnPositioningEnd?.(event);
    },
    [consumerOnPositioningEnd],
  );

  /**
   * Defeats the UA popover stylesheet before the engine positions the surface.
   *
   * `[popover]:popover-open` applies `inset: 0; margin: auto`. A JavaScript positioner writes
   * `left` and `top` and then translates, which overrides only the longhands it sets — leaving
   * `right: 0` and `bottom: 0` in force and stretching the surface across the viewport. Clearing
   * `inset` is what keeps it sized to its content; the shorthand then reads back as
   * `0px auto auto 0px`, which is correct.
   *
   * This belongs to the surface, not the engine: headless is what made the element a popover.
   */
  const applyTopLayerReset = React.useCallback<React.RefCallback<HTMLElement>>(node => {
    if (!node) {
      return;
    }

    node.style.setProperty('inset', 'auto');
    node.style.setProperty('margin', '0');
  }, []);

  const engineOptions: CanonicalPositioningProps = {
    ...(positioningOptions as CanonicalPositioningProps),
    // Headless surfaces are promoted to the top layer, where `fixed` is correct — and
    // `@fluentui/react-positioning` defaults to `absolute`. Supplied as a default so an explicit
    // `strategy` from the consumer still wins.
    strategy: positioningOptions.strategy ?? 'fixed',
    onPositioningEnd: delegate ? handlePositioningEnd : consumerOnPositioningEnd,
  };

  // Exactly one engine runs, and the two do not run the same number of hooks — which is why the
  // engine's identity has to be stable for the lifetime of the component. Changing it mid-life
  // fails as a React hook-order error.
  const { targetRef, containerRef } = (delegate ?? useCssAnchorEngine)(engineOptions);

  const mergedContainerRef = useMergedRefs(applyTopLayerReset, containerRef);

  return {
    targetRef: targetRef as React.RefCallback<HTMLElement>,
    containerRef: mergedContainerRef,
  };
}
