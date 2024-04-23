import { VirtualizerScrollViewDynamic } from '@fluentui/react-components/unstable';
import descriptionMd from './VirtualizerScrollViewDynamicDescription.md';

export { AutoMeasure } from './AutoMeasure.stories';
export { Default } from './Default.stories';
export { ScrollTo } from './ScrollTo.stories';
export { ScrollLoading } from './ScrollLoading.stories';
export { SnapToAlignment } from './SnapToAlignment.stories';

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
