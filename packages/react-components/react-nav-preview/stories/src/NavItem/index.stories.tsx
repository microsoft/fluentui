import { NavItem } from '@fluentui/react-nav-preview';

import descriptionMd from './NavItemDescription.md';
import bestPracticesMd from './NavItemBestPractices.md';

// export { Default } from './NavItemDefault.stories';

export default {
  title: 'Preview Components/NavItem',
  component: NavItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
