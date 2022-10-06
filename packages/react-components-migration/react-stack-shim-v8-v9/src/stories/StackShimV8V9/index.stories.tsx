import { StackShim } from '@fluentui/react-stack-shim-v8-v9';

import descriptionMd from './StackShimDescription.md';
import bestPracticesMd from './StackShimBestPractices.md';

export { Default } from './StackShimDefault.stories';

export default {
  title: 'Preview Components/StackShim',
  component: StackShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
