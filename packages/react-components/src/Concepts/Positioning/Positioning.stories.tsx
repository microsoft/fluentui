import { Positioning } from './utils.stories';
import descriptionMd from './PositioningDescription.md';
import bestPracticesMd from './PositioningBestPractices.md';

export { Default } from './PositioningDefault.stories';
export { ShorthandPositions } from './PositioningShorthandPositions.stories';
export { CoverTarget } from './PositioningCoverTarget.stories';
export { OffsetValue } from './PositioningOffsetValue.stories';
export { OffsetFunction } from './PositioningOffsetFunction.stories';
export { AnchorToTarget } from './PositioningAnchorToTarget.stories';
export { PopperImperativeHandle } from './PositioningPopperImperativeHandle.stories';

export default {
  title: 'Concepts/Developer/Positioning',
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
