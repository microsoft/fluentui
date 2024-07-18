import { VerticalBarChart } from '../../src/VerticalBarChart';

import descriptionMd from './VerticalBarChartDescription.md';
import bestPracticesMd from './VerticalBarChartBestPractices.md';

export { VCBasic } from './VerticalBarChartDefault.stories';
export { VCCustomAccess } from './VerticalBarChartCustomAccessibility.stories';
export { VCDateAxis } from './VerticalBarChartDateAxis.stories';
export { VCAxisTooltip } from './VerticalBarChartAxisTooltip.stories';
export { VCRotateLabels } from './VerticalBarChartRotateLabels.stories';
export { VCStyled } from './VerticalBarChartStyled.stories';
export { VCDynamic } from './VerticalBarChartDynamic.stories';

export default {
  title: 'Compat Components/Charts/VerticalBarChart',
  component: VerticalBarChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
