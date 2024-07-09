import ScaleDescription from './Description.md';
import { Scale } from '@fluentui/react-motion-components-preview';

export { Default } from './Default.stories';
export { Custom } from './Custom.stories';

export default {
  title: 'Utilities/Motion Components/Presence/Scale',
  component: Scale,
  parameters: {
    docs: {
      description: {
        component: ScaleDescription,
      },
    },
  },
};
