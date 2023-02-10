import { CalendarDayGrid } from '@fluentui/react-datepicker';

import descriptionMd from './CalendarDayGridDescription.md';
import bestPracticesMd from './CalendarDayGridBestPractices.md';

export { Default } from './CalendarDayGridDefault.stories';

export default {
  title: 'Preview Components/CalendarDayGrid',
  component: CalendarDayGrid,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
