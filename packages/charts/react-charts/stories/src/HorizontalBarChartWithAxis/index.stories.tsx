import { HorizontalBarChartWithAxis } from '@fluentui/react-charts';

import descriptionMd from './HorizontalBarChartWithAxisDescription.md';
import bestPracticesMd from './HorizontalBarChartWithAxisBestPractices.md';

export { HorizontalBarWithAxisBasic } from './HorizontalBarChartWithAxisDefault.stories';
export { HorizontalBarWithAxisStringAxisTooltip } from './HorizontalBarChartWithAxisStringAxisTooltip.stories';
export { HorizontalBarWithAxisDynamic } from './HorizontalBarChartWithAxisDynamic.stories';
export { HorizontalBarWithAxisNegative } from './HorizontalBarChartWithAxisNegative.stories';
export { HorizontalBarWithAxisCategoryOrder } from './HorizontalBarChartWithAxisCategoryOrder.stories';

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
