import { PrimaryButtonShim } from '@fluentui/react-button-shim-v8-v9';

import descriptionMd from './PrimaryButtonShimDescription.md';
import bestPracticesMd from './PrimaryButtonShimBestPractices.md';

export { Default } from './PrimaryButtonShimDefault.stories';

export default {
  title: 'Preview Components/PrimaryButtonShim',
  component: PrimaryButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
