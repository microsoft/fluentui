import { Sparkline } from '../../src/Sparkline';

import descriptionMd from './SparklineDescription.md';
import bestPracticesMd from './SparklineBestPractices.md';

export { HBCBasic } from './SparklineDefault.stories';

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
