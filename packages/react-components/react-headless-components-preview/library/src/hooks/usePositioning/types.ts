import type * as React from 'react';
import type {
  PositioningEngine,
  PositioningProps as CanonicalPositioningProps,
  PositioningShorthandValue,
} from '@fluentui/react-positioning';

export type { PositioningEngine };

export type LogicalAlignment = 'start' | 'center' | 'end';

export type PositioningReturn = {
  targetRef: React.RefCallback<HTMLElement>;
  containerRef: React.RefCallback<HTMLElement>;
  arrowRef: React.RefCallback<HTMLElement>;
};

/**
 * Positioning options accepted by headless components.
 *
 * This is the canonical `PositioningProps` contract from `@fluentui/react-positioning` plus an optional
 * `engine`. Without an engine, surfaces are positioned with CSS anchor positioning, which honors
 * `position`, `align`, `offset`, `coverTarget`, `matchTargetSize`, `pinned`, `fallbackPositions`,
 * `strategy`, `target` and `positioningRef`. The remaining options (`autoSize`, `flipBoundary`,
 * `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `useTransform`,
 * `disableUpdateOnResize`, `onPositioningEnd`) require an engine and are ignored otherwise — a warning
 * is logged in development.
 */
export type PositioningProps = CanonicalPositioningProps & {
  /**
   * A JavaScript positioning engine that replaces CSS anchor positioning for this surface entirely.
   * When set (or provided through `PositioningEngineProvider`), the engine owns every positioning
   * option, including the ones the CSS engine also supports.
   */
  engine?: PositioningEngine;
};

export type PositioningShorthand = PositioningProps | PositioningShorthandValue;
