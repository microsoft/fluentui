import { LineChart } from '../../src/LineChart';

import descriptionMd from './LineChartDescription.md';
import bestPracticesMd from './LineChartBestPractices.md';

export { LCBasic } from './LineChartDefault.stories';

export default {
  title: 'Compat Components/Charts/LineChart',
  component: LineChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
