import { HeatMapChart } from '@fluentui/react-charts';

import overviewMd from './docs/HeatMapChartOverview.md';
import bestPracticesMd from './docs/HeatMapChartBestPractices.md';
import dosMd from './docs/HeatMapChartDos.md';
import dontsMd from './docs/HeatMapChartDonts.md';

export { HeatMapChartBasic } from './HeatMapChartBasic.stories';
export { HeatMapChartCustomAccessibility } from './HeatMapChartCustomAccessibility.stories';

export default {
  title: 'Charts/HeatMapChart',
  component: HeatMapChart,
  parameters: {
    docs: {
      description: {
        component: [overviewMd, bestPracticesMd, dosMd, dontsMd].join('\n'),
      },
    },
  },
};
