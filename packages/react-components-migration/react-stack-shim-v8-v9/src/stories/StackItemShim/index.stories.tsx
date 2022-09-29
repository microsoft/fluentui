import { StackItemShim } from '@fluentui/react-stack-shim-v8-v9';

import descriptionMd from './StackItemShimDescription.md';
import bestPracticesMd from './StackItemShimBestPractices.md';

export { Default } from './StackItemShimDefault.stories';

export default {
  title: 'Preview Components/StackItemShim',
  component: StackItemShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
