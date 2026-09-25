'use client';

import * as React from 'react';
import type { PositioningImperativeRef } from '@fluentui/react-positioning';
import type { PositioningProps, PositioningReturn } from './types';
import { useCssAnchorPositioning } from './useCssAnchorPositioning';
import { useEnginePositioning } from './useEnginePositioning';
import { usePositioningEngineContext } from './PositioningEngineContext';

export type { TargetElement } from './useCssAnchorPositioning';

/**
 * Options that CSS anchor positioning cannot express. They only take effect with an engine.
 */
const ENGINE_ONLY_OPTIONS = [
  'arrowPadding',
  'autoSize',
  'disableUpdateOnResize',
  'flipBoundary',
  'onPositioningEnd',
  'overflowBoundary',
  'overflowBoundaryPadding',
  'shiftToCoverTarget',
  'useTransform',
] as const satisfies ReadonlyArray<keyof PositioningProps>;

const noopRef: React.RefCallback<HTMLElement> = () => undefined;

/**
 * Positions a surface relative to a target.
 *
 * By default this uses native CSS anchor positioning. When an engine is supplied — inline through
 * `options.engine` or app-wide through `PositioningEngineProvider` — the engine owns positioning
 * entirely and the CSS path is not applied.
 */
export function usePositioning(options: PositioningProps): PositioningReturn {
  const { engine: engineFromOptions, positioningRef, ...positioningOptions } = options;
  const engineFromContext = usePositioningEngineContext();
  const engine = engineFromOptions ?? engineFromContext;
  const strategy = positioningOptions.strategy ?? 'fixed';

  const unsupportedOptions = engine
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
          'positioning. Pass `positioning={{ engine }}` or wrap the tree in `PositioningEngineProvider` ' +
          '(for example with `floatingUIPositioningEngine` from `@fluentui/react-positioning`).',
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
