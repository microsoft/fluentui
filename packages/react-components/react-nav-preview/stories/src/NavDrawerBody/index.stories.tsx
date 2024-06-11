import { NavDrawerBody } from '@fluentui/react-nav-preview';

import descriptionMd from './NavDrawerBodyDescription.md';
import bestPracticesMd from './NavDrawerBodyBestPractices.md';

// export { Default } from './NavDrawerBodyDefault.stories';

export default {
  title: 'Preview Components/NavDrawerBody',
  component: NavDrawerBody,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
