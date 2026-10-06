import type * as React from 'react';
import type {
  PositioningProps as CanonicalPositioningProps,
  PositioningShorthandValue,
  PositioningVirtualElement,
} from '@fluentui/react-positioning';

export type LogicalAlignment = 'start' | 'center' | 'end';

export type PositioningReturn = {
  targetRef: React.RefCallback<HTMLElement>;
  containerRef: React.RefCallback<HTMLElement>;
  arrowRef: React.RefCallback<HTMLElement>;
};

export type PositioningProps = Pick<
  CanonicalPositioningProps,
  | 'align'
  | 'arrowPadding'
  | 'autoSize'
  | 'coverTarget'
  | 'disableUpdateOnResize'
  | 'fallbackPositions'
  | 'flipBoundary'
  | 'matchTargetSize'
  | 'offset'
  | 'onPositioningEnd'
  | 'overflowBoundary'
  | 'overflowBoundaryPadding'
  | 'pinned'
  | 'position'
  | 'positioningRef'
  | 'strategy'
  | 'target'
> & {
  /**
   * Disables positioning.
   * @default true
   */
  enabled?: boolean;
};

export type PositioningShorthand = PositioningProps | PositioningShorthandValue;

export type PositioningTarget = HTMLElement | PositioningVirtualElement;
