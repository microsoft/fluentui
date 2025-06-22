import FadeDescription from './FadeDescription.md';
import { Default } from './FadeDefault.stories';
export { Default } from './FadeDefault.stories';
export { Snappy } from './FadeSnappy.stories';
export { Relaxed } from './FadeRelaxed.stories';
export { Customization } from './FadeCustomization.stories';

export default {
  title: 'Motion/Components (preview)/Fade',
  component: Default,
  parameters: {
    docs: {
      description: {
        component: FadeDescription,
      },
    },
  },
};
