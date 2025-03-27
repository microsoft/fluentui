import { ScatterChart } from '@fluentui/react-charts-preview';

import descriptionMd from './ScatterChartDescription.md';
import bestPracticesMd from './ScatterChartBestPractices.md';

export { ScatterChartDefault } from './ScatterChartDefault.stories';

export default {
  title: 'Charts/ScatterChart',
  component: ScatterChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
