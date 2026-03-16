import { ScatterChart } from '@fluentui/react-charts';

import descriptionMd from './ScatterChartDescription.md';
import bestPracticesMd from './ScatterChartBestPractices.md';

export { ScatterChartDefault } from './ScatterChartDefault.stories';
export { ScatterChartDate } from './ScatterChartDate.stories';
export { ScatterChartString } from './ScatterChartString.stories';
export { ScatterChartLogAxisExample } from './ScatterChartLogAxis.stories';

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
