import { VirtualizerScrollViewDynamic } from '@fluentui/react-virtualizer';
import descriptionMd from './VirtualizerScrollViewDynamicDescription.md';
import accessibilityMd from './VirtualizerScrollViewDynamicAccessibility.md';

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
        component: [descriptionMd, accessibilityMd].join('\n'),
      },
    },
  },
};
