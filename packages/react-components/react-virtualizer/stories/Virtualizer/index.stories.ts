import { Virtualizer } from '../../src/Virtualizer';
import descriptionMd from './VirtualizerDescription.md';

export { Default } from './Default.stories';
export { Dynamic } from './Dynamic.stories';
export { Horizontal } from './Horizontal.stories';
export { ReversedHorizontal } from './ReversedHorizontal.stories';
export { Reversed } from './Reversed.stories';
export { RTL } from './RTL.stories';

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
