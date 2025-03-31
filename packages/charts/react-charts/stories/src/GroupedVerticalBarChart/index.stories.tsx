import { GroupedVerticalBarChart } from '@fluentui/react-charts';

import descriptionMd from './GroupedVerticalBarChartDescription.md';
import bestPracticesMd from './GroupedVerticalBarChartBestPractices.md';

export { GroupedVerticalBarDefault } from './GroupedVerticalBarChartDefault.stories';

export default {
  title: 'Charts/GroupedVerticalBarChart',
  component: GroupedVerticalBarChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
