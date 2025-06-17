import { GaugeChart } from '@fluentui/react-charts';

import descriptionMd from './GaugeChartDescription.md';
import bestPracticesMd from './GaugeChartBestPractices.md';

export { GaugeChartBasic } from './GaugeChartDefault.stories';
export { GaugeChartSingleSegment } from './GaugeChartSingleSegment.stories';
export { GaugeChartResponsive } from './GaugeChartResponsive.stories';

export default {
  title: 'Charts/GaugeChart',
  component: GaugeChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
