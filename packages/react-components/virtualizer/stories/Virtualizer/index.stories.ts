import { Virtualizer } from '@fluentui/react-components/unstable';
import descriptionMd from './VirtualizerDescription.md';

export { Default } from './Default.stories';
export { Horizontal } from './Horizontal.stories';
export { ReversedHorizontal } from './ReversedHorizontal.stories';
export { Reversed } from './Reversed.stories';

export default {
  title: 'Preview Components/Virtualizer',
  component: Virtualizer,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
