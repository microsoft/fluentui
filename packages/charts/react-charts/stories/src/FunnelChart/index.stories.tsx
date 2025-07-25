import { FunnelChart } from '@fluentui/react-charts';

import descriptionMd from './FunnelChartDescription.md';
import bestPracticesMd from './FunnelChartBestPractices.md';

export { FunnelChartBasic } from './FunnelChartDefault.stories';
export { FunnelChartStacked } from './FunnelChartStacked.stories';

export default {
  title: 'Charts/FunnelChart',
  component: FunnelChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
