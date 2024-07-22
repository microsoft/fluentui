import { AppNode } from '@fluentui/react-nav-preview';

import descriptionMd from './AppNodeDescription.md';
import bestPracticesMd from './AppNodeBestPractices.md';

// export { Default } from './AppNodeDefault.stories';

export default {
  title: 'Preview Components/AppNode',
  component: AppNode,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
