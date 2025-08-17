import { HorizontalBarChart } from '@fluentui/react-charts';

import descriptionMd from './HorizontalBarChartDescription.md';
import bestPracticesMd from './HorizontalBarChartBestPractices.md';

export { HorizontalBarBasic } from './HorizontalBarChartDefault.stories';
export { HorizontalBarAbsoluteScale } from './HorizontalBarChartVariant.stories';
export { HorizontalBarBenchmark } from './HorizontalBarChartBenchmark.stories';
export { HorizontalBarStacked } from './HorizontalBarChartStacked.stories';
export { HorizontalBarCustomAccessibility } from './HorizontalBarChartCustomAccessibility.stories';
export { HorizontalBarCustomCallout } from './HorizontalBarChartCustomCallout.stories';
export { HorizontalBarStackedAnnotatedInlineLegend } from './HorizontalBarChartStackedAnnotatedInlineLegend.stories';

export default {
  title: 'Charts/HorizontalBarChart',
  component: HorizontalBarChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
