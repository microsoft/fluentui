import { AppItemStatic } from '@fluentui/react-nav-preview';

import descriptionMd from './AppItemStaticDescription.md';
import bestPracticesMd from './AppItemStaticBestPractices.md';

// export { Default } from './AppItemStaticDefault.stories';

export default {
  title: 'Preview Components/AppItemStatic',
  component: AppItemStatic,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
