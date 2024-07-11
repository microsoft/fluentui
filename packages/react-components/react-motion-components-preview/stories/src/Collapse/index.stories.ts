import CollapseDescription from './Description.md';
import { Collapse } from '@fluentui/react-motion-components-preview';

export { Default } from './Default.stories';
export { Snappy } from './Snappy.stories';
export { Exaggerated } from './Exaggerated.stories';
export { Custom } from './Custom.stories';

export default {
  title: 'Utilities/Motion Components/Collapse',
  component: Collapse,
  parameters: {
    docs: {
      description: {
        component: CollapseDescription,
      },
    },
  },
};
