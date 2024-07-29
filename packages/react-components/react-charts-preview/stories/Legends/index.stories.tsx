import descriptionMd from './LegendsDescription.md';
import bestPracticesMd from './LegendsBestPractices.md';
import { Legends } from '../../src/Legends';

export { LegendsBasic } from './LegendsDefault.stories';

export default {
  title: 'Compat Components/Charts/Legends',
  component: Legends,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
