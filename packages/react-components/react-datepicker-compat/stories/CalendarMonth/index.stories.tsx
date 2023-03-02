import { CalendarMonth } from '@fluentui/react-datepicker-compat';

import descriptionMd from './CalendarMonthDescription.md';
import bestPracticesMd from './CalendarMonthBestPractices.md';

export { Default } from './CalendarMonthDefault.stories';

export default {
  title: 'Preview Components/CalendarMonth',
  component: CalendarMonth,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
