import { Scale } from '@fluentui/react-motion-components-preview';
import ScaleDescription from './ScaleDescription.md';

export { Default } from './ScaleDefault.stories';
export { Snappy } from './ScaleSnappy.stories';
export { Exaggerated } from './ScaleExaggerated.stories';
export { Customization } from './ScaleCustomization.stories';

export default {
  title: 'Utilities/Motion/Components (preview)/Scale',
  component: Scale,
  parameters: {
    docs: {
      description: {
        component: ScaleDescription,
      },
    },
  },
};
