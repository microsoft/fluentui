import {
  DATA_PLACEMENT,
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_INTERSECTING,
  DATA_POSITIONING_PLACEMENT,
  POSITIONING_END_EVENT,
} from './constants';
import { createPositionManager } from './createPositionManager';
import { matchTargetSizeCssVar } from './middleware';
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

/**
 * Inline styles the position manager and its middleware may write on the container. Shorthands come
 * before their longhands so that restoring them in order does not wipe restored longhands.
 */
const CONTAINER_STYLE_PROPERTIES = [
  'inset',
  'top',
  'right',
  'bottom',
  'left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'position',
  'transform',
  'box-sizing',
  'width',
  'height',
  'max-width',
  'max-height',
  'overflow-x',
  'overflow-y',
  matchTargetSizeCssVar,
];

const CONTAINER_ATTRIBUTES = [
  DATA_PLACEMENT,
  DATA_POSITIONING_PLACEMENT,
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_INTERSECTING,
];

const ARROW_STYLE_PROPERTIES = ['top', 'left'];

/**
 * Records the current values of the given inline styles and attributes, and returns a function that
 * restores them.
 */
function snapshotElement(element: HTMLElement, styleProperties: string[], attributes: string[] = []): () => void {
  const styles = styleProperties.map(property => [property, element.style.getPropertyValue(property)] as const);
  const attributeValues = attributes.map(attribute => [attribute, element.getAttribute(attribute)] as const);

  return () => {
    styles.forEach(([property, value]) => {
      if (value) {
        element.style.setProperty(property, value);
      } else {
        element.style.removeProperty(property);
      }
    });
    attributeValues.forEach(([attribute, value]) => {
      if (value === null) {
        element.removeAttribute(attribute);
      } else {
        element.setAttribute(attribute, value);
      }
    });
  };
}

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

      const restoreContainer = snapshotElement(container, CONTAINER_STYLE_PROPERTIES, CONTAINER_ATTRIBUTES);
      const restoreArrow = arrow ? snapshotElement(arrow, ARROW_STYLE_PROPERTIES) : undefined;

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
          restoreContainer();
          restoreArrow?.();
        },
      };
    },
  };
}

/**
 * Default Floating UI {@link PositioningEngine}. See {@link createFloatingUIPositioningEngine}.
 */
export const floatingUIPositioningEngine: PositioningEngine = createFloatingUIPositioningEngine();
