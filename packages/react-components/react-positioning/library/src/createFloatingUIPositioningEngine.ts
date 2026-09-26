import { DATA_PLACEMENT, POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
import { resolvePositioningOptions } from './resolvePositioningOptions';
import type {
  OnPositioningEndEvent,
  PositioningConfigurationFn,
  PositioningEngine,
  PositioningEngineCreateParams,
  PositionManager,
} from './types';
import { toPositioningShorthandValue } from './utils';

const NOOP_MANAGER: PositionManager = {
  updatePosition: () => undefined,
  dispose: () => undefined,
};

const DEFAULT_CONFIGURATION: PositioningConfigurationFn = ({ options }) => options;

export type CreateFloatingUIPositioningEngineOptions = {
  /**
   * Equivalent of `PositioningConfigurationProvider` for engine consumers: lets you post-process the
   * resolved options for every surface positioned by this engine.
   */
  configuration?: PositioningConfigurationFn;
};

/**
 * Creates a {@link PositioningEngine} backed by Floating UI — the same implementation that powers
 * `usePositioning()` in Fluent UI React v9.
 *
 * Intended for consumers of `@fluentui/react-headless-components-preview` who need positioning
 * features that CSS anchor positioning cannot express (`autoSize`, `flipBoundary`,
 * `overflowBoundary`, virtual targets, etc.).
 *
 */
export function createFloatingUIPositioningEngine(
  engineOptions: CreateFloatingUIPositioningEngineOptions = {},
): PositioningEngine {
  const { configuration = DEFAULT_CONFIGURATION } = engineOptions;

  return {
    create: (params: PositioningEngineCreateParams): PositionManager => {
      const { container, target, arrow, options, dir = 'ltr', targetDocument = container.ownerDocument } = params;
      const { enabled = true, onPositioningEnd } = options;
      const isRtl = dir === 'rtl';

      if (!enabled) {
        return NOOP_MANAGER;
      }

      // Top-layer surfaces (`[popover]:popover-open`, `dialog:modal`) receive `inset: 0` from the UA
      // stylesheet. The manager only writes `left`/`top`, so `right`/`bottom` must be released first or
      // the surface stretches across the viewport.
      container.style.setProperty('inset', 'auto');

      const handlePositioningEnd = (event: Event) => {
        const { placement } = (event as OnPositioningEndEvent).detail;
        container.setAttribute(DATA_PLACEMENT, toPositioningShorthandValue(placement, isRtl));
        onPositioningEnd?.(event as OnPositioningEndEvent);
      };
      container.addEventListener(POSITIONING_END_EVENT, handlePositioningEnd);

      const manager = createPositionManager({
        container,
        target,
        arrow,
        ...resolvePositioningOptions({
          container,
          arrow,
          options,
          isRtl,
          targetDocument,
          configFn: configuration,
        }),
      });

      return {
        updatePosition: manager.updatePosition,
        dispose: () => {
          container.removeEventListener(POSITIONING_END_EVENT, handlePositioningEnd);
          manager.dispose();
        },
      };
    },
  };
}

/**
 * Default Floating UI {@link PositioningEngine}. See {@link createFloatingUIPositioningEngine}.
 */
export const floatingUIPositioningEngine: PositioningEngine = createFloatingUIPositioningEngine();
