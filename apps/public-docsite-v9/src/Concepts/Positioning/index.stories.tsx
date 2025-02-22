import { Positioning } from './utils.stories';
import descriptionMd from './PositioningDescription.md';
import bestPracticesMd from './PositioningBestPractices.md';

export { Default } from './PositioningDefault.stories';
export { ShorthandPositions } from './PositioningShorthandPositions.stories';
export { CoverTarget } from './PositioningCoverTarget.stories';
export { OffsetValue } from './PositioningOffsetValue.stories';
export { OffsetFunction } from './PositioningOffsetFunction.stories';
export { AnchorToTarget } from './PositioningAnchorToTarget.stories';
export { ImperativeAnchorTarget } from './PositioningImperativeAnchorTarget.stories';
export { ImperativePositionUpdate } from './PositioningImperativePositionUpdate.stories';
export { OverflowBoundary } from './PositioningOverflowBoundary.stories';
export { OverflowBoundaryRect } from './PositioningOverflowBoundaryRect.stories';
export { OverflowBoundaryPadding } from './PositioningOverflowBoundaryPadding.stories';
export { FlipBoundary } from './PositioningFlipBoundary.stories';
export { MatchTargetSize } from './PositioningMatchTargetSize.stories';
export { DisableTransform } from './PositioningDisableTransform.stories';
export { ListenToUpdates } from './PositioningListenToUpdates.stories';
export { AutoSizeForSmallViewport } from './PositioningAutoSize.stories';
export { CoverTargetForSmallViewport } from './PositioningShiftToCoverTarget.stories';
export { FallbackPositions } from './PositioningFallbackPositions.stories';

export default {
  title: 'Concepts/Developer/Positioning Components',
  component: Positioning,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
