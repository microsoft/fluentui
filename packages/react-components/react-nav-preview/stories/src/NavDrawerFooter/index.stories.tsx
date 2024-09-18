import { NavDrawerFooter } from '@fluentui/react-nav-preview';

import descriptionMd from './NavDrawerFooterDescription.md';
import bestPracticesMd from './NavDrawerFooterBestPractices.md';

// export { Default } from './NavDrawerFooterDefault.stories';

export default {
  title: 'Preview Components/NavDrawerFooter',
  component: NavDrawerFooter,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
