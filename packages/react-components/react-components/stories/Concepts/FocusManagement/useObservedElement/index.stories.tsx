import { useFocusableGroup } from '@fluentui/react-components';
import descriptionMd from './useObservedElementDescription.md';

export { Default } from './Default.stories';
export { MultipleNames } from './MultipleNames.stories';

export default {
  title: 'Utilities/Focus Management/useObservedElement',
  component: useFocusableGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
