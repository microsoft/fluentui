import { ChartTable } from '@fluentui/react-charts';

import descriptionMd from './ChartTableDescription.md';
import bestPracticesMd from './ChartTableBestPractices.md';

export { ChartTableBasic } from './ChartTableDefault.stories';

export default {
  title: 'Charts/ChartTable',
  component: ChartTable,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
