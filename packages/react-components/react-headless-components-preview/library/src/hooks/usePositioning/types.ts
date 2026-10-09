import type * as React from 'react';
import type { PositioningProps, PositioningShorthandValue } from '@fluentui/react-positioning';

export type LogicalAlignment = 'start' | 'center' | 'end';

export type PositioningReturn = {
  targetRef: React.RefCallback<HTMLElement>;
  containerRef: React.RefCallback<HTMLElement>;
  arrowRef: React.RefCallback<HTMLElement>;
};

// Headless accepts the canonical `PositioningProps` contract. Without `PositioningProvider` (from the
// `positioning-floating-ui` entry) only the options CSS anchor positioning can express take effect.
export type { PositioningProps } from '@fluentui/react-positioning';

export type PositioningShorthand = PositioningProps | PositioningShorthandValue;
