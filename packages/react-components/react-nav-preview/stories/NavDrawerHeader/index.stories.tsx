import { NavDrawerHeader } from '@fluentui/react-nav-preview';

import descriptionMd from './NavDrawerHeaderDescription.md';
import bestPracticesMd from './NavDrawerHeaderBestPractices.md';

// export { Default } from './NavDrawerHeaderDefault.stories';

export default {
  title: 'Preview Components/NavDrawerHeader',
  component: NavDrawerHeader,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
