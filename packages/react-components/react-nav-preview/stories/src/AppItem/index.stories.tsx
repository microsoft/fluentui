import { AppItem } from '@fluentui/react-nav-preview';

import descriptionMd from './AppItemDescription.md';
import bestPracticesMd from './AppItemBestPractices.md';

// export { Default } from './AppItemDefault.stories';

export default {
  title: 'Preview Components/Nav/AppItem',
  component: AppItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
