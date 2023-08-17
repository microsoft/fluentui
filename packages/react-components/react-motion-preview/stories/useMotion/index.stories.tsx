import descriptionMd from './UseMotionDescription.md';
import bestPracticesMd from './UseMotionBestPractices.md';

export { Default } from './UseMotionDefault.stories';

export default {
  title: 'Preview Components/useMotion',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
