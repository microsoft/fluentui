import { ToggleButtonShim } from '@fluentui/react-button-shim-v8-v9';

import descriptionMd from './ToggleButtonShimDescription.md';
import bestPracticesMd from './ToggleButtonShimBestPractices.md';

export { Default } from './ToggleButtonShimDefault.stories';

export default {
  title: 'Preview Components/ToggleButtonShim',
  component: ToggleButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
