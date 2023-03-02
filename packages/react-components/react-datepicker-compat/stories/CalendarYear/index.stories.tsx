import { CalendarYear } from '@fluentui/react-datepicker-compat';

import descriptionMd from './CalendarYearDescription.md';
import bestPracticesMd from './CalendarYearBestPractices.md';

export { Default } from './CalendarYearDefault.stories';

export default {
  title: 'Preview Components/CalendarYear',
  component: CalendarYear,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
