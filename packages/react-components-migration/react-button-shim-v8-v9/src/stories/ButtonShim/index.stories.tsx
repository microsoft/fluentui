import { ButtonShim } from '@fluentui/react-button-shim-v8-v9';

import descriptionMd from './ButtonShimDescription.md';
import bestPracticesMd from './ButtonShimBestPractices.md';

export { Default } from './ButtonShimDefault.stories';

export default {
  title: 'Preview Components/ButtonShim',
  component: ButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
