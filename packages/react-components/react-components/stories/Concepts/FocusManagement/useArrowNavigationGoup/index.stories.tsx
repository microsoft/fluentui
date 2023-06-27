import { useArrowNavigationGroup } from '@fluentui/react-components';
import descriptionMd from './useArrowNavigationGroupDescription.md';

export { Default } from './Default.stories';
export { Axis } from './Axis.stories';
export { CircularNavigation } from './CircularNavigation.stories';
export { Memorize } from './Memorize.stories';

export default {
  title: 'Utilities/Focus Management/useArrowNavigationGroup',
  component: useArrowNavigationGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
