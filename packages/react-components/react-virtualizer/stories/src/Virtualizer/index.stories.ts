import { Virtualizer } from '@fluentui/react-components/unstable';
import descriptionMd from './VirtualizerDescription.md';

export { Default } from './Default.stories';
export { DefaultUnbounded } from './DefaultUnbounded.stories';
export { Dynamic } from './Dynamic.stories';
export { Horizontal } from './Horizontal.stories';
export { ReversedHorizontal } from './ReversedHorizontal.stories';
export { Reversed } from './Reversed.stories';
export { RTL } from './RTL.stories';
export { MultiUnbounded } from './MultiUnbounded.stories';

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
