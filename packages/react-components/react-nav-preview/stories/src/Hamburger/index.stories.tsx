import { Hamburger } from '@fluentui/react-nav-preview';

import descriptionMd from './HamburgerDescription.md';
import bestPracticesMd from './HamburgerBestPractices.md';

// export { Default } from './HamburgerDefault.stories';

export default {
  title: 'Preview Components/Hamburger',
  component: Hamburger,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
