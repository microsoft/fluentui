import { CalendarDay } from '@fluentui/react-datepicker';

import descriptionMd from './CalendarDayDescription.md';
import bestPracticesMd from './CalendarDayBestPractices.md';

export { Default } from './CalendarDayDefault.stories';

export default {
  title: 'Preview Components/CalendarDay',
  component: CalendarDay,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
