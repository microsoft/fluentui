import ScaleDescription from './ScaleDescription.md';

import { Default } from './ScaleDefault.stories';
export { Default } from './ScaleDefault.stories';
export { Snappy } from './ScaleSnappy.stories';
export { Relaxed } from './ScaleRelaxed.stories';
export { Customization } from './ScaleCustomization.stories';

export default {
  title: 'Motion/Components (preview)/Scale',
  component: Default,
  parameters: {
    docs: {
      description: {
        component: ScaleDescription,
      },
    },
  },
};
