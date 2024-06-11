import { VirtualizerScrollView } from '@fluentui/react-components/unstable';
import descriptionMd from './VirtualizerScrollViewDescription.md';

export { Default } from './Default.stories';
export { ScrollTo } from './ScrollTo.stories';
export { SnapToAlignment } from './SnapToAlignment.stories';

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
