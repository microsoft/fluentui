import { DefaultScale as Scale } from './Scale.stories';
import ScaleDescription from './ScaleDescription.md';

export { Default } from './ScaleDefault.stories';
export { Snappy } from './ScaleSnappy.stories';
export { Relaxed } from './ScaleRelaxed.stories';
export { Customization } from './ScaleCustomization.stories';

export default {
  title: 'Motion/Components (preview)/Scale',
  component: Scale,
  parameters: {
    docs: {
      description: {
        component: ScaleDescription,
      },
    },
  },
};
