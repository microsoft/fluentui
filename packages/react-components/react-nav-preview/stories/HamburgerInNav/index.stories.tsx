import { HamburgerInNav } from '@fluentui/react-nav-preview';

import descriptionMd from './HamburgerInNavDescription.md';
import bestPracticesMd from './HamburgerInNavBestPractices.md';

// export { Default } from './HamburgerInNavDefault.stories';

export default {
  title: 'Preview Components/HamburgerInNav',
  component: HamburgerInNav,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
