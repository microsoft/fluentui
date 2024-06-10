import { HorizontalBarChart } from '../src/HorizontalBarChart';

import descriptionMd from './HorizontalBarChartDescription.md';
import bestPracticesMd from './HorizontalBarChartBestPractices.md';

export { HBCBasic } from './HorizontalBarChartDefault.stories';

export default {
  title: 'Compat Components/Charts/HorizontalBarChart',
  component: HorizontalBarChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
