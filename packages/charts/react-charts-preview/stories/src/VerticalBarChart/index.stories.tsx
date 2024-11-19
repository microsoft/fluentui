import { VerticalBarChart } from '@fluentui/react-charts-preview';

import descriptionMd from './VerticalBarChartDescription.md';
import bestPracticesMd from './VerticalBarChartBestPractices.md';

export { VerticalBarDefault } from './VerticalBarChartDefault.stories';
export { VerticalBarCustomAccessibility } from './VerticalBarChartCustomAccessibility.stories';
export { VerticalBarDateAxis } from './VerticalBarChartDateAxis.stories';
export { VerticalBarAxisTooltip } from './VerticalBarChartAxisTooltip.stories';
export { VerticalBarRotateLabels } from './VerticalBarChartRotateLabels.stories';
export { VerticalBarStyled } from './VerticalBarChartStyled.stories';
export { VerticalBarDynamic } from './VerticalBarChartDynamic.stories';

export default {
  title: 'Charts/VerticalBarChart',
  component: VerticalBarChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
