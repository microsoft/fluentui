import { LineChart } from '@fluentui/react-charts';

import descriptionMd from './LineChartDescription.md';
import bestPracticesMd from './LineChartBestPractices.md';

export { LineChartBasic } from './LineChartDefault.stories';
export { LineChartCustomAccessibility } from './LineChartCustomAccessibility.stories';
export { LineChartMultiple } from './LineChartMultiple.stories';
export { LineChartStyled } from './LineChartStyled.stories';
export { LineChartCustomLocaleDateAxis } from './LineChartCustomLocaleDateAxis.stories';
export { LineChartEvents } from './LineChartEvents.stories';
export { LineChartGaps } from './LineChartGaps.stories';
export { LineChartLargeData } from './LineChartLargeData.stories';
export { LineChartNegative } from './LineChartNegative.stories';
export { LineChartAllNegative } from './LineChartAllNegative.stories';
export { LineChartSecondaryYAxis } from './LineChartSecondaryYAxis.stories';
export { LineChartLogAxisExample } from './LineChartLogAxis.stories';

export default {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
