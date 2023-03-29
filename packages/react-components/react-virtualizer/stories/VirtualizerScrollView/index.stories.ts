import { VirtualizerScrollView } from '../../src/VirtualizerScrollView';
import descriptionMd from './VirtualizerScrollViewDescription.md';

export { Default } from './Default.stories';

export default {
  title: 'Preview Components/VirtualizerScrollView',
  component: VirtualizerScrollView,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
