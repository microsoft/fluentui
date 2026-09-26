import { Positioning } from './utils.stories';

import descriptionMd from './PositioningDescription.md';
import bestPracticesMd from './PositioningBestPractices.md';

export { Default } from './PositioningDefault.stories';
export { ShorthandPositions } from './PositioningShorthandPositions.stories';
export { Offset } from './PositioningOffset.stories';
export { CoverTarget } from './PositioningCoverTarget.stories';
export { MatchTargetSize } from './PositioningMatchTargetSize.stories';
export { FallbackPositions } from './PositioningFallbackPositions.stories';
export { FlippingBlock } from './PositioningFlippingBlock.stories';
export { FlippingInline } from './PositioningFlippingInline.stories';
export { FlippingCorner } from './PositioningFlippingCorner.stories';
export { Engine } from './PositioningEngine.stories';
export { EngineFlipBoundary } from './PositioningEngineFlipBoundary.stories';
export { EngineOverflowBoundary } from './PositioningEngineOverflowBoundary.stories';
export { EngineOverflowBoundaryRect } from './PositioningEngineOverflowBoundaryRect.stories';
export { EngineOverflowBoundaryPadding } from './PositioningEngineOverflowBoundaryPadding.stories';
export { EngineAutoSize } from './PositioningEngineAutoSize.stories';
export { EngineShiftToCoverTarget } from './PositioningEngineShiftToCoverTarget.stories';
export { EngineDisableTransform } from './PositioningEngineDisableTransform.stories';
export { EngineListenToUpdates } from './PositioningEngineListenToUpdates.stories';

export default {
  title: 'Concepts/Positioning',
  component: Positioning,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
