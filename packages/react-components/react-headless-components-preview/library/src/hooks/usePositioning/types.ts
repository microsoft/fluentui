import type * as React from 'react';
import type { PositioningProps, PositioningVirtualElement } from '@fluentui/react-positioning';

export type {
  Alignment,
  AutoSize,
  Offset,
  OffsetFunction,
  OffsetFunctionParam,
  OffsetObject,
  OffsetShorthand,
  Position,
  PositioningBoundary,
  PositioningImperativeRef,
  PositioningProps,
  PositioningRect,
  PositioningShorthand,
  PositioningShorthandValue,
  PositioningVirtualElement,
  SetVirtualMouseTarget,
} from '@fluentui/react-positioning';

export type LogicalAlignment = 'start' | 'center' | 'end';

export type PositioningReturn = {
  targetRef: React.RefCallback<HTMLElement>;
  containerRef: React.RefCallback<HTMLElement>;
  arrowRef: React.RefCallback<HTMLElement>;
};

/**
 * Options of the hook: the public `PositioningProps` of `@fluentui/react-positioning` plus `enabled`.
 */
export type UsePositioningOptions = PositioningProps & {
  /**
   * Disables positioning.
   * @default true
   */
  enabled?: boolean;
};

export type PositioningTarget = HTMLElement | PositioningVirtualElement;
