import { CommandButtonShim } from '@fluentui/react-button-shim-v8-v9';

import descriptionMd from './CommandButtonShimDescription.md';
import bestPracticesMd from './CommandButtonShimBestPractices.md';

export { Default } from './CommandButtonShimDefault.stories';

export default {
  title: 'Preview Components/CommandButtonShim',
  component: CommandButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
