import { NavSectionHeader } from '@fluentui/react-nav-preview';

import descriptionMd from './NavSectionHeaderDescription.md';
import bestPracticesMd from './NavSectionHeaderBestPractices.md';

// export { Default } from './NavSectionHeaderDefault.stories';

export default {
  title: 'Preview Components/NavSectionHeader',
  component: NavSectionHeader,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
