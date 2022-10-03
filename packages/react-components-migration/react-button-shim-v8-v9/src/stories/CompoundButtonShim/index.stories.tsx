import { CompoundButtonShim } from '@fluentui/react-button-shim-v8-v9';

import descriptionMd from './CompoundButtonShimDescription.md';
import bestPracticesMd from './CompoundButtonShimBestPractices.md';

export { Default } from './CompoundButtonShimDefault.stories';

export default {
  title: 'Preview Components/CompoundButtonShim',
  component: CompoundButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
