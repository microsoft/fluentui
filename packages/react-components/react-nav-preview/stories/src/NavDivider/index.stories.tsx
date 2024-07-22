import { NavDivider } from '@fluentui/react-nav-preview';

import descriptionMd from './NavDividerDescription.md';
import bestPracticesMd from './NavDividerBestPractices.md';

// export { Default } from './NavDividerDefault.stories';

export default {
  title: 'Preview Components/NavDivider',
  component: NavDivider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
