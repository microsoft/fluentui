import descriptionMd from './UseMotionDescription.md';

export { Default } from './UseMotionDefault.stories';

export default {
  title: 'Utilities/Motion/useMotion',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
