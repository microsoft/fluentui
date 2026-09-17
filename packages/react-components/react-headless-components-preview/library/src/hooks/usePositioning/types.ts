import type * as React from 'react';
import type {
  PositioningProps as CanonicalPositioningProps,
  PositioningShorthandValue,
} from '@fluentui/react-positioning';

export type LogicalAlignment = 'start' | 'center' | 'end';

export type PositioningReturn = {
  targetRef: React.RefCallback<HTMLElement>;
  containerRef: React.RefCallback<HTMLElement>;
};

export type PositioningProps = Pick<
  CanonicalPositioningProps,
  | 'align'
  | 'coverTarget'
  | 'fallbackPositions'
  | 'matchTargetSize'
  | 'offset'
  | 'pinned'
  | 'position'
  | 'positioningRef'
  | 'strategy'
  | 'target'
>;

/**
 * Refs an engine hands back so the component can attach them to the elements it owns.
 *
 * Typed as `React.Ref` rather than `React.RefCallback` because `@fluentui/react-positioning`
 * returns ref *objects* — `useCallbackRef` facades whose `current` setter drives its position
 * manager. `useMergedRefs` accepts either form, so no conversion is needed.
 */
export type PositioningEngineReturn = {
  targetRef: React.Ref<HTMLElement>;
  containerRef: React.Ref<HTMLElement>;
  arrowRef?: React.Ref<HTMLElement>;
};

/**
 * A positioning implementation, supplied uncalled and invoked by the component.
 *
 * The component invokes it with options it has already merged, so configuration it derives
 * internally — a submenu's placement, a pointer-derived target — reaches the engine by
 * construction. Consumers never restate component semantics.
 *
 * `usePositioning` from `@fluentui/react-positioning` satisfies this signature directly; no
 * adapter is required.
 *
 * Rules of hooks apply: the component invokes this as a hook, so its identity must be stable for
 * the lifetime of the component instance. Pass a module-scope import rather than an inline
 * function — changing it mid-life fails as a React hook-order error.
 */
export type PositioningEngine = (options: CanonicalPositioningProps) => PositioningEngineReturn;

/**
 * Positioning configuration for a component.
 *
 * A JS-only option such as `autoSize` is rejected without an engine and accepted with one. No
 * explicit `never` mapping is needed: the engine branch requires `engine`, so an object carrying a
 * JS-only option but no engine fails that branch, and `PositioningProps` is a weak type — every
 * property optional — which TypeScript refuses for an object sharing none of its properties. Both
 * the fresh-literal and the through-a-variable cases are covered.
 */
export type PositioningShorthand =
  | PositioningShorthandValue
  | (PositioningProps & { engine?: 'default' })
  | (CanonicalPositioningProps & { engine: PositioningEngine });

/** Narrows a resolved positioning value to one carrying an engine to delegate to. */
export function hasPositioningEngine(
  value: Readonly<CanonicalPositioningProps> & { engine?: 'default' | PositioningEngine },
): value is Readonly<CanonicalPositioningProps> & { engine: PositioningEngine } {
  return typeof value.engine === 'function';
}
