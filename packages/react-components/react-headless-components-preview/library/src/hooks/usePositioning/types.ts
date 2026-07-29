import type * as React from 'react';
import type { PositioningProps as CanonicalPositioningProps } from '@fluentui/react-positioning';

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
