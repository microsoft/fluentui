import * as React from 'react';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

/**
 * Options the default CSS anchor engine honours.
 *
 * The remaining canonical options (`autoSize`, `flipBoundary`, `overflowBoundary`, `useTransform`
 * and friends) require a JavaScript engine — see the Engine example — and are excluded here so the
 * auto-generated args table describes the default configuration rather than every option that could
 * ever be legal.
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
