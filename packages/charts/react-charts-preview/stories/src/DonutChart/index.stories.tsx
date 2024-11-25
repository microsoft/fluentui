import { DonutChart } from '@fluentui/react-charts-preview';

import descriptionMd from './DonutChartDescription.md';
import bestPracticesMd from './DonutChartBestPractices.md';

export { DonutChartBasic } from './DonutChartDefault.stories';
export { DonutChartCustomAccessibility } from './DonutChartCustomAccessibility.stories';
export { DonutChartDynamic } from './DonutChartDynamic.stories';
export { DonutChartCustomCallout } from './DonutChartCustomCallout.stories';
export { DonutChartStyled } from './DonutChartStyled.stories';

export default {
  title: 'Charts/DonutChart',
  component: DonutChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
