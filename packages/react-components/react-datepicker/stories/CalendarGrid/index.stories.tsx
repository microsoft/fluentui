import { CalendarGrid } from '@fluentui/react-datepicker';

import descriptionMd from './CalendarGridDescription.md';
import bestPracticesMd from './CalendarGridBestPractices.md';

export { Default } from './CalendarGridDefault.stories';

export default {
  title: 'Preview Components/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
