import { NavSubItem } from '@fluentui/react-nav-preview';

import descriptionMd from './NavSubItemDescription.md';
import bestPracticesMd from './NavSubItemBestPractices.md';

// export { Default } from './NavSubItemDefault.stories';

export default {
  title: 'Preview Components/NavSubItem',
  component: NavSubItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
