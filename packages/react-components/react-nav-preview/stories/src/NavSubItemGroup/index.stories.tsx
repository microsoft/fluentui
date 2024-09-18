import { NavSubItemGroup } from '@fluentui/react-nav-preview';

import descriptionMd from './NavSubItemGroupDescription.md';
import bestPracticesMd from './NavSubItemGroupBestPractices.md';

// export { Default } from './NavSubItemGroupDefault.stories';

export default {
  title: 'Preview Components/NavSubItemGroup',
  component: NavSubItemGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
