import { AreaChart } from '@fluentui/react-charts';

import descriptionMd from './AreaChartDescription.md';
import bestPracticesMd from './AreaChartBestPractices.md';

export { AreaChartBasic } from './AreaChartDefault.stories';
export { AreaChartCustomAccessibility } from './AreaChartCustomAccessibility.stories';
export { AreaChartLargeData } from './AreaChartLargeData.stories';
export { AreaChartMultiple } from './AreaChartMultiple.stories';
export { AreaChartNegative } from './AreaChartNegative..stories';
export { AreaChartMultipleNegative } from './AreaChartMultipleNegative.stories';
export { AreaChartAllNegative } from './AreaChartAllNegative.stories';
export { AreaChartSecondaryYAxis } from './AreaChartSecondaryYAxis.stories';

export default {
  title: 'Charts/AreaChart',
  component: AreaChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
