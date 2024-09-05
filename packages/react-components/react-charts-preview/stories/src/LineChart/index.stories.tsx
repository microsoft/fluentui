import { LineChart } from '@fluentui/react-charts-preview';

import descriptionMd from './LineChartDescription.md';
import bestPracticesMd from './LineChartBestPractices.md';

export { LCBasic } from './LineChartDefault.stories';
export { LCCustomAccess } from './LineChartCustomAccessibility.stories';
export { LCMultiple } from './LineChartMultiple.stories';
export { LCStyled } from './LineChartStyled.stories';
export { LCCustomLocale } from './LineChartCustomLocaleDateAxis.stories';
export { LCEvents } from './LineChartEvents.stories';
export { LCGaps } from './LineChartGaps.stories';
export { LCLargeData } from './LineChartLargeData.stories';

export default {
  title: 'Compat Components/Charts/LineChart',
  component: LineChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
