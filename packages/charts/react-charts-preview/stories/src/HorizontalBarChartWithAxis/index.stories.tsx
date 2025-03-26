import { HorizontalBarChartWithAxis } from '@fluentui/react-charts-preview';

import descriptionMd from './HorizontalBarChartWithAxisDescription.md';
import bestPracticesMd from './HorizontalBarChartWithAxisBestPractices.md';

export { HorizontalBarWithAxisBasic } from './HorizontalBarChartWithAxisDefault.stories';

export default {
  title: 'Charts/HorizontalBarChartWithAxis',
  component: HorizontalBarChartWithAxis,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
