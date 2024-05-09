import { NavCategory } from '@fluentui/react-nav-preview';

import descriptionMd from './NavCategoryDescription.md';
import bestPracticesMd from './NavCategoryBestPractices.md';

// export { Default } from './NavCategoryDefault.stories';

export default {
  title: 'Preview Components/NavCategory',
  component: NavCategory,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
