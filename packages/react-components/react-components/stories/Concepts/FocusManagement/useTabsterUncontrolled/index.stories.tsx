import { useTabsterUncontrolled } from '@fluentui/react-components';
import descriptionMd from './useTabsterUncontrolledDescription.md';

export { Default } from './Default.stories';

export default {
  title: 'Utilities/Focus Management/useTabsterUncontrolled',
  component: useTabsterUncontrolled,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
