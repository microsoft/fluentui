import { TooltipV2 } from '@fluentui/react-tooltip-v2-preview';

import descriptionMd from './TooltipV2Description.md';
import bestPracticesMd from './TooltipV2BestPractices.md';

export { Default } from './TooltipV2Default.stories';

export default {
  title: 'Preview Components/TooltipV2',
  component: TooltipV2,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
