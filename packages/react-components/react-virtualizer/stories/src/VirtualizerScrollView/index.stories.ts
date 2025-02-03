import { VirtualizerScrollView } from '@fluentui/react-virtualizer';
import descriptionMd from './VirtualizerScrollViewDescription.md';
import accessibilityMd from './VirtualizerScrollViewAccessibility.md';

export { Default } from './Default.stories';
export { ScrollTo } from './ScrollTo.stories';
export { SnapToAlignment } from './SnapToAlignment.stories';

export default {
  title: 'Preview Components/VirtualizerScrollView',
  component: VirtualizerScrollView,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, accessibilityMd].join('\n'),
      },
    },
  },
};
