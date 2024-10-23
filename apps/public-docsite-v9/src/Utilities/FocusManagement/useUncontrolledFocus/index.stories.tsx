import { useUncontrolledFocus } from '@fluentui/react-components';
import descriptionMd from './useUncontrolledFocusDescription.md';

export { Default } from './Default.stories';

export default {
  title: 'Utilities/Focus Management/useUncontrolledFocus',
  component: useUncontrolledFocus,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
