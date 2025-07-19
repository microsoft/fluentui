import { SankeyChart } from '@fluentui/react-charts';

import overviewMd from './docs/SankeyChartOverview.md';
import bestPracticesMd from './docs/SankeyChartBestPractices.md';
import dosMd from './docs/SankeyChartDos.md';
import dontsMd from './docs/SankeyChartDonts.md';

export { SankeyChartBasic } from './SankeyChartBasic.stories';
export { SankeyChartInbox } from './SankeyChartInbox.stories';
export { SankeyChartRebalance } from './SankeyChartRebalance.stories';
export { SankeyChartResponsive } from './SankeyChartResponsive.stories';

export default {
  title: 'Charts/SankeyChart',
  component: SankeyChart,
  parameters: {
    docs: {
      description: {
        component: [overviewMd, bestPracticesMd, dosMd, dontsMd].join('\n'),
      },
    },
  },
};
