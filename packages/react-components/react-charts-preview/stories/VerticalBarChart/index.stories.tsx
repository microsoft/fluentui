import { VerticalBarChart } from '../../src/VerticalBarChart';

import descriptionMd from './VerticalBarChartDescription.md';
import bestPracticesMd from './VerticalBarChartBestPractices.md';

export { VCBasic } from './VerticalBarChartDefault.stories';

export default {
  title: 'Compat Components/Charts/VerticalBarChart',
  component: VerticalBarChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
