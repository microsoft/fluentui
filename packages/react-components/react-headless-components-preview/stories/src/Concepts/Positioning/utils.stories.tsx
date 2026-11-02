import * as React from 'react';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

/**
 * Subset of `PositioningProps` that the headless preview's `usePositioning` actually consumes.
 * Props not destructured by the hook (e.g. `autoSize`, `flipBoundary`, `useTransform`) are excluded
 * so Storybook's auto-generated args table only advertises what is supported.
 */
type SupportedPositioningProps = Omit<
  PositioningProps,
  | 'arrowPadding'
  | 'autoSize'
  | 'disableUpdateOnResize'
  | 'flipBoundary'
  | 'onPositioningEnd'
  | 'overflowBoundary'
  | 'overflowBoundaryPadding'
  | 'shiftToCoverTarget'
  | 'useTransform'
>;

/**
 * Helper component used by Storybook to auto-generate the positioning props args table.
 */
export const Positioning: React.FC<SupportedPositioningProps> = () => <div />;
