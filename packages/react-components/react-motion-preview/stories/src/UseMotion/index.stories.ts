import descriptionMd from './MotionDescription.md';
import usageMd from './MotionUsage.md';
import previewMd from './MotionPreview.md';

export { UseMotion as useMotion } from './UseMotion.stories';
export { UseMotionWithDuration as useMotionWithDuration } from './UseMotionWithDuration.stories';
export { UseMotionClassNames as useMotionClassNames } from './UseMotionClassNames.stories';

export default {
  title: 'Utilities/Motion (Preview)/useMotion',
  component: null,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, previewMd, usageMd].join('\n'),
      },
    },
  },
};
