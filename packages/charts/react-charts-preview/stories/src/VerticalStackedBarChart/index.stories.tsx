import { VerticalStackedBarChart } from '@fluentui/react-charts-preview';

import descriptionMd from './VerticalStackedBarChartDescription.md';
import bestPracticesMd from './VerticalStackedBarChartBestPractices.md';

export { VerticalStackedBarDefault } from './VerticalStackedBarChartDefault.stories';

export default {
  title: 'Charts/VerticalStackedBarChart',
  component: VerticalStackedBarChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
