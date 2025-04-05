import { AreaChart } from '@fluentui/react-charts';

import descriptionMd from './AreaChartDescription.md';
import bestPracticesMd from './AreaChartBestPractices.md';

export { AreaChartBasic } from './AreaChartDefault.stories';
export { AreaChartCustomAccessibility } from './AreaChartCustomAccessibility.stories';
export { AreaChartLargeData } from './AreaChartLargeData.stories';
export { AreaChartMultiple } from './AreaChartMultiple.stories';

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
