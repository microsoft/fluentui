import type * as React from 'react';

export type Position = 'above' | 'below' | 'before' | 'after';
export type Alignment = 'top' | 'bottom' | 'start' | 'end' | 'center';
export type LogicalAlignment = 'start' | 'center' | 'end';

/**
 * Imperative API exposed via `PositioningProps.positioningRef`.
 */
export type PositioningImperativeRef = {
  /** Retarget the surface to the given element (or clear the target with `null`). */
  setTarget: (target: HTMLElement | null) => void;
  /** Request a position recomputation. With CSS anchor positioning layout is automatic, so this is a no-op on supporting browsers. */
  updatePosition: () => void;
};

export type PositioningShorthandValue =
  | 'above'
  | 'above-start'
  | 'above-end'
  | 'below'
  | 'below-start'
  | 'below-end'
  | 'before'
  | 'before-start'
  | 'before-end'
  | 'after'
  | 'after-start'
  | 'after-end';

export type PositioningProps = {
  /**
   * @default 'above'
   */
  position?: Position;
  /**
   * @default 'center'
   */
  align?: Alignment;
  /** Offset from the anchor element */
  offset?: number | { mainAxis?: number; crossAxis?: number };
  /**
   * Fallback placements tried in order when the primary placement would
   * overflow the viewport. Accepts shorthand strings like `'below-start'`.
   * When omitted, the default is the native `flip-block, flip-inline`
   * fallback chain.
   */
  fallbackPositions?: PositioningShorthandValue[];
  /** Position on top of the target */
  coverTarget?: boolean;
  /**
   * Custom anchor element for the positioned surface. When provided, the
   * anchor-name is written to this element instead of the target assigned via
   * the returned `targetRef`. Accepts a DOM element or a RefObject.
   */
  target?: HTMLElement | React.RefObject<HTMLElement | null> | null;
  /**
   * CSS `position` value used on the positioned surface. Matches v9's default.
   * @default 'absolute'
   */
  strategy?: 'absolute' | 'fixed';
  /**
   * Makes the surface match one of the trigger's dimensions. Currently only
   * `'width'` is supported; the surface's `width` is set via CSS
   * `anchor-size(width)`.
   */
  matchTargetSize?: 'width';
  /**
   * When true the surface stays at its requested placement even if it overflows
   * the viewport (no `flip` fallback). Useful for menus or tooltips that must
   * not switch sides unexpectedly.
   * @default false
   */
  pinned?: boolean;
  /**
   * Imperative handle for programmatically retargeting the surface or
   * triggering a position update. See {@link PositioningImperativeRef}.
   */
  positioningRef?: React.Ref<PositioningImperativeRef>;
};

export type PositioningShorthand = PositioningProps | PositioningShorthandValue;

export type PositioningReturn = {
  targetRef: React.RefCallback<HTMLElement>;
  containerRef: React.RefCallback<HTMLElement>;
};
