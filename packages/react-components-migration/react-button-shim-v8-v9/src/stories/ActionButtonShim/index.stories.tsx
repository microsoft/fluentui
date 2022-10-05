import { ActionButtonShim } from '@fluentui/react-button-shim-v8-v9';

import descriptionMd from './ActionButtonShimDescription.md';
import bestPracticesMd from './ActionButtonShimBestPractices.md';

export { Default } from './ActionButtonShimDefault.stories';

export default {
  title: 'Preview Components/ActionButtonShim',
  component: ActionButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
