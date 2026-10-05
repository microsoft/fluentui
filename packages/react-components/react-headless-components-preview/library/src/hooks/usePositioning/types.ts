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

export type PositioningShorthand = PositioningProps | PositioningShorthandValue;

export type PositioningTarget = HTMLElement | PositioningVirtualElement;

/**
 * Options that are handled by plugins, they are ignored without them.
 */
export type ExtendedPositioningProps = PositioningProps &
  Pick<
    CanonicalPositioningProps,
    | 'arrowPadding'
    | 'autoSize'
    | 'disableUpdateOnResize'
    | 'flipBoundary'
    | 'onPositioningEnd'
    | 'overflowBoundary'
    | 'overflowBoundaryPadding'
  > & {
    /**
     * Disables positioning.
     * @default true
     */
    enabled?: boolean;
  };

export type ExtendedPositioningReturn = PositioningReturn & {
  arrowRef: React.RefCallback<HTMLElement>;
};
