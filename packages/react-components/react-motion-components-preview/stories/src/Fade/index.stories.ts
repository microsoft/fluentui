import { Fade } from '@fluentui/react-motion-components-preview';
import FadeDescription from './FadeDescription.md';

export { Default } from './FadeDefault.stories';
export { Snappy } from './FadeSnappy.stories';
export { Exaggerated } from './FadeExaggerated.stories';
export { Customization } from './FadeCustomization.stories';

export default {
  title: 'Utilities/Motion/Components (preview)/Fade',
  component: Fade,
  parameters: {
    docs: {
      description: {
        component: FadeDescription,
      },
    },
  },
};
