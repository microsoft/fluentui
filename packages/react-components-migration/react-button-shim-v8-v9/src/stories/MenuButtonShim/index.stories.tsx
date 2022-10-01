import { MenuButtonShim } from '@fluentui/react-button-shim-v8-v9';

import descriptionMd from './MenuButtonShimDescription.md';
import bestPracticesMd from './MenuButtonShimBestPractices.md';

export { Default } from './MenuButtonShimDefault.stories';

export default {
  title: 'Preview Components/MenuButtonShim',
  component: MenuButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
