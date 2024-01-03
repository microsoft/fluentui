import { VirtualizerScrollViewDynamic } from '../../src/VirtualizerScrollViewDynamic';
import descriptionMd from './VirtualizerScrollViewDynamicDescription.md';

export { AutoMeasure } from './AutoMeasure.stories';
export { Default } from './Default.stories';
export { ScrollTo } from './ScrollTo.stories';
export { ScrollLoading } from './ScrollLoading.stories';

export default {
  title: 'Preview Components/VirtualizerScrollViewDynamic',
  component: VirtualizerScrollViewDynamic,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
