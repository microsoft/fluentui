import { Sparkline } from '@fluentui/react-charts';

import descriptionMd from './SparklineDescription.md';
import bestPracticesMd from './SparklineBestPractices.md';

export { SparklineBasic } from './SparklineDefault.stories';

export default {
  title: 'Charts/Sparkline',
  component: Sparkline,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
