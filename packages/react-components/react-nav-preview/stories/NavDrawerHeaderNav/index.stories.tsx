import { NavDrawerHeaderNav } from '@fluentui/react-nav-preview';

import descriptionMd from './NavDrawerHeaderNavDescription.md';
import bestPracticesMd from './NavDrawerHeaderNavBestPractices.md';

export { Default } from './NavDrawerHeaderNavDefault.stories';

export default {
  title: 'Preview Components/NavDrawerHeaderNav',
  component: NavDrawerHeaderNav,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
