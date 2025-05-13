import { Stagger } from '@fluentui/react-motion-components-preview';
import StaggerDescription from './StaggerDescription.md';

export { Default } from './StaggerDefault.stories';

export default {
  title: 'Motion/Choreography (preview)/Stagger',
  component: Stagger,
  parameters: {
    docs: {
      description: {
        component: StaggerDescription,
      },
    },
  },
};
