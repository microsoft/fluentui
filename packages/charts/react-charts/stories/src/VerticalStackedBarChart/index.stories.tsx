import { VerticalStackedBarChart } from '@fluentui/react-charts';

import descriptionMd from './VerticalStackedBarChartDescription.md';
import bestPracticesMd from './VerticalStackedBarChartBestPractices.md';

export { VerticalStackedBarDefault } from '../../../../react-charts/stories/src/VerticalStackedBarChart/VerticalStackedBarChartDefault.stories';
export { VerticalStackedBarAxisTooltip } from '../../../../react-charts/stories/src/VerticalStackedBarChart/VerticalStackedBarChartAxisTooltip.stories';
export { VerticalStackedBarCallout } from '../../../../react-charts/stories/src/VerticalStackedBarChart/VerticalStackedBarChartCallout.stories';
export { VerticalStackedBarCustomAccessibility } from '../../../../react-charts/stories/src/VerticalStackedBarChart/VerticalStackedBarChartCustomAccessibility.stories';
export { VerticalStackedBarDateAxis } from '../../../../react-charts/stories/src/VerticalStackedBarChart/VerticalStackedBarChartDateAxis.stories';

export default {
  title: 'Charts/VerticalStackedBarChart',
  component: VerticalStackedBarChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
