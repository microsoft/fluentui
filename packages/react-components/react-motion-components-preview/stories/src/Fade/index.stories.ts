import { DefaultFade as Fade } from './Fade.stories';
import FadeDescription from './FadeDescription.md';

export { Default } from './FadeDefault.stories';
export { Snappy } from './FadeSnappy.stories';
export { Relaxed } from './FadeRelaxed.stories';
export { Customization } from './FadeCustomization.stories';

export default {
  title: 'Motion/Components (preview)/Fade',
  component: Fade,
  parameters: {
    docs: {
      description: {
        component: FadeDescription,
      },
    },
  },
};
