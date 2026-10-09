'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { PositioningImperativeRef } from '@fluentui/react-positioning';
import type { PositioningProps, PositioningReturn } from './types';
import { useCssAnchorPositioning } from './useCssAnchorPositioning';
import { useEnginePositioning } from './useEnginePositioning';
import { usePositioningEngineContext } from './PositioningEngineContext';
import { isFallbackPositioningEngine } from './fallbackPositioningEngine';
import { supportsCssAnchorPositioning } from './utils';

export type { TargetElement } from './useCssAnchorPositioning';

/**
 * Options that CSS anchor positioning cannot express. A fallback engine takes over when any is set.
 */
const REQUIRES_ENGINE_OPTIONS = [
  'arrowPadding',
  'autoSize',
  'flipBoundary',
  'onPositioningEnd',
  'overflowBoundary',
  'overflowBoundaryPadding',
  'shiftToCoverTarget',
] as const satisfies ReadonlyArray<keyof PositioningProps>;

/**
 * Options that only tune an engine. They have no effect on the CSS path, but do not need an engine.
 */
const ENGINE_TUNING_OPTIONS = ['disableUpdateOnResize', 'useTransform'] as const satisfies ReadonlyArray<
  keyof PositioningProps
>;

const ENGINE_ONLY_OPTIONS = [...REQUIRES_ENGINE_OPTIONS, ...ENGINE_TUNING_OPTIONS].sort();

const noopRef: React.RefCallback<HTMLElement> = () => undefined;

/**
 * Positions a surface relative to a target.
 *
 * By default this uses native CSS anchor positioning. `PositioningProvider` (from the
 * `positioning-floating-ui` entry) supplies an engine through context: in `floating-ui` mode the engine
 * owns positioning entirely, in `fallback` mode it is only used when the browser lacks CSS anchor
 * positioning or the options need an engine.
 */
export function usePositioning(options: PositioningProps): PositioningReturn {
  const { positioningRef, ...positioningOptions } = options;
  const requestedEngine = usePositioningEngineContext();
  const { targetDocument } = useFluent();

  const requiresEngine =
    typeof positioningOptions.offset === 'function' ||
    REQUIRES_ENGINE_OPTIONS.some(key => positioningOptions[key] !== undefined);
  const engine =
    isFallbackPositioningEngine(requestedEngine) &&
    !requiresEngine &&
    supportsCssAnchorPositioning(targetDocument?.defaultView)
      ? undefined
      : requestedEngine;

  // Headless surfaces render in the top layer, so both positioners default to `fixed` (the v9 engine
  // default would otherwise be `absolute`).
  const strategy = positioningOptions.strategy ?? 'fixed';

  const unsupportedOptions = requestedEngine
    ? ''
    : ENGINE_ONLY_OPTIONS.filter(key => positioningOptions[key] !== undefined)
        .map(key => `"${key}"`)
        .join(', ');
  const warnedRef = React.useRef(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && unsupportedOptions && !warnedRef.current) {
      warnedRef.current = true;
      // eslint-disable-next-line no-console
      console.warn(
        '@fluentui/react-headless-components-preview [usePositioning]: ' +
          `${unsupportedOptions} require a JavaScript positioning engine and have no effect with CSS anchor ` +
          'positioning. Wrap the tree in `<PositioningProvider mode="fallback">` from ' +
          '`@fluentui/react-headless-components-preview/positioning-floating-ui`.',
      );
    }
  }, [unsupportedOptions]);

  const css = useCssAnchorPositioning({
    enabled: engine === undefined,
    align: positioningOptions.align,
    coverTarget: positioningOptions.coverTarget,
    fallbackPositions: positioningOptions.fallbackPositions,
    matchTargetSize: positioningOptions.matchTargetSize,
    offset: positioningOptions.offset,
    pinned: positioningOptions.pinned,
    position: positioningOptions.position,
    strategy,
    target: positioningOptions.target,
  });

  const delegated = useEnginePositioning({ ...positioningOptions, strategy, engine });

  const active = engine ? delegated : css;

  React.useImperativeHandle<PositioningImperativeRef, PositioningImperativeRef>(
    positioningRef,
    () => ({
      setTarget: active.setTarget,
      updatePosition: active.updatePosition,
    }),
    [active],
  );

  return React.useMemo(
    () => ({
      targetRef: active.targetRef,
      containerRef: active.containerRef,
      arrowRef: engine ? delegated.arrowRef : noopRef,
    }),
    [active, delegated.arrowRef, engine],
  );
}
