import { MenuItemShim } from '@fluentui/react-menu-shim-v8-v9';

import descriptionMd from './MenuShimDescription.md';
import bestPracticesMd from './MenuShimBestPractices.md';

export { Default } from './MenuShimDefault.stories';

export default {
  title: 'Preview Components/MenuShim',
  component: MenuItemShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
