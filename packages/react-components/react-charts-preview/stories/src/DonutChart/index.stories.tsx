import { DonutChart } from '@fluentui/react-charts-preview';

import descriptionMd from './DonutChartDescription.md';
import bestPracticesMd from './DonutChartBestPractices.md';

export { DonutBasic } from './DonutChartDefault.stories';
export { DonutCustomAccess } from './DonutChartCustomAccessibility.stories';
export { DonutDynamic } from './DonutChartDynamic.stories';
export { DonutCustomCallout } from './DonutChartCustomCallout.stories';

export default {
  title: 'Compat Components/Charts/DonutChart',
  component: DonutChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
