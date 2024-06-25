import { DonutChart } from '../../src/DonutChart';

import descriptionMd from './DonutChartDescription.md';
import bestPracticesMd from './DonutChartBestPractices.md';

export { DonutBasic } from './DonutChartDefault.stories';

export default {
  title: 'Compat Components/Charts/DonutChart',
  component: DonutChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
