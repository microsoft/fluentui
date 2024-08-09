import { SplitNavItem } from '@fluentui/react-nav-preview';

import descriptionMd from './SplitNavItemDescription.md';
import bestPracticesMd from './SplitNavItemBestPractices.md';

export { Default } from './SplitNavItemDefault.stories';

export default {
  title: 'Preview Components/SplitNavItem',
  component: SplitNavItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
