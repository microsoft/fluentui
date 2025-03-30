import { DeclarativeChart } from '@fluentui/react-charts';
import descriptionMd from './docs/DeclarativeChartOverview.md';

export { DeclarativeChartBasicExample } from './DeclarativeChart.Basic.Example';

export default {
  title: 'Components/DeclarativeChart',
  component: DeclarativeChart,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
