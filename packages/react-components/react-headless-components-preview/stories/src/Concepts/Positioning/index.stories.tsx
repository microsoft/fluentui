import { Positioning } from './utils.stories';

import descriptionMd from './PositioningDescription.md';
import bestPracticesMd from './PositioningBestPractices.md';

export { Default } from './PositioningDefault.stories';
export { ShorthandPositions } from './PositioningShorthandPositions.stories';
export { Offset } from './PositioningOffset.stories';
export { CoverTarget } from './PositioningCoverTarget.stories';
export { AutoSize } from './PositioningAutoSize.stories';
export { OverflowBoundary } from './PositioningOverflowBoundary.stories';
export { MatchTargetSize } from './PositioningMatchTargetSize.stories';
export { FallbackPositions } from './PositioningFallbackPositions.stories';
export { FlippingBlock } from './PositioningFlippingBlock.stories';
export { FlippingInline } from './PositioningFlippingInline.stories';
export { FlippingCorner } from './PositioningFlippingCorner.stories';

export default {
  title: 'Headless Concepts/Positioning',
  component: Positioning,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
