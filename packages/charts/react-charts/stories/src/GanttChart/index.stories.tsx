import { GanttChart } from '@fluentui/react-charts';

import descriptionMd from './GanttChartDescription.md';
import bestPracticesMd from './GanttChartBestPractices.md';

export { GanttChartBasic } from './GanttChartDefault.stories';

export default {
  title: 'Charts/GanttChart',
  component: GanttChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
