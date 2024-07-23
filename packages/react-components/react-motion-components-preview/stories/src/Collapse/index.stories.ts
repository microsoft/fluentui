import { Collapse } from '@fluentui/react-motion-components-preview';
import CollapseDescription from './CollapseDescription.md';

export { Default } from './CollapseDefault.stories';
export { Snappy } from './CollapseSnappy.stories';
export { Exaggerated } from './CollapseExaggerated.stories';
export { Customization } from './CollapseCustomization.stories';

export default {
  title: 'Utilities/Motion/Components (preview)/Collapse',
  component: Collapse,
  parameters: {
    docs: {
      description: {
        component: CollapseDescription,
      },
    },
  },
};
