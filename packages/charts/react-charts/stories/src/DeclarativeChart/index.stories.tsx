import { DeclarativeChart } from '@fluentui/react-charts';
import descriptionMd from './DeclarativeChartOverview.md';

export { DeclarativeChartBasicExample } from './DeclarativeChart.Basic.Example';

export default {
  title: 'Charts/DeclarativeChart',
  component: DeclarativeChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
