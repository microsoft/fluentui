import { DefaultButtonShim } from '@fluentui/react-button-shim-v8-v9';

import descriptionMd from './DefaultButtonShimDescription.md';
import bestPracticesMd from './DefaultButtonShimBestPractices.md';

export { Default } from './DefaultButtonShimDefault.stories';

export default {
  title: 'Preview Components/DefaultButtonShim',
  component: DefaultButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
