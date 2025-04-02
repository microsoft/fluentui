import { DeclarativeChart } from '@fluentui/react-charts';
import descriptionMd from './docs/DeclarativeChartOverview.md';

export { DeclarativeChartBasicExample } from './DeclarativeChartDefault.stories';

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
