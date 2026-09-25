import { POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
import { resolvePositioningOptions } from './resolvePositioningOptions';
import type {
  PositioningConfigurationFn,
  PositioningEngine,
  PositioningEngineCreateParams,
  PositionManager,
} from './types';

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
 * @example
 * ```tsx
 * import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
 *
 * <Menu positioning={{ autoSize: true, engine: floatingUIPositioningEngine }} />
 * ```
 */
export function createFloatingUIPositioningEngine(
  engineOptions: CreateFloatingUIPositioningEngineOptions = {},
): PositioningEngine {
  const { configuration = DEFAULT_CONFIGURATION } = engineOptions;

  return {
    create: (params: PositioningEngineCreateParams): PositionManager => {
      const { container, target, arrow, options, dir = 'ltr', targetDocument = container.ownerDocument } = params;
      const { enabled = true, onPositioningEnd } = options;

      if (!enabled) {
        return NOOP_MANAGER;
      }

      const manager = createPositionManager({
        container,
        target,
        arrow,
        ...resolvePositioningOptions({
          container,
          arrow,
          options,
          isRtl: dir === 'rtl',
          targetDocument,
          configFn: configuration,
        }),
      });

      // Cast because CustomEvent<OnPositioningEndEventDetail> is not assignable to EventListener
      const onPositioningEndListener = onPositioningEnd as EventListener | undefined;
      if (onPositioningEndListener) {
        container.addEventListener(POSITIONING_END_EVENT, onPositioningEndListener);
      }

      return {
        updatePosition: manager.updatePosition,
        dispose: () => {
          if (onPositioningEndListener) {
            container.removeEventListener(POSITIONING_END_EVENT, onPositioningEndListener);
          }
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
