import { Sparkline } from '@fluentui/react-charts-preview';

import descriptionMd from './SparklineDescription.md';
import bestPracticesMd from './SparklineBestPractices.md';

export { SparklineBasic } from './SparklineDefault.stories';

export default {
  title: 'Compat Components/Charts/Sparkline',
  component: Sparkline,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
