import { Calendar } from '@fluentui/react-calendar-compat';

import descriptionMd from './CalendarDescription.md';
import bestPracticesMd from './CalendarBestPractices.md';

export { Default } from './CalendarDefault.stories';

export default {
  title: 'Preview Components/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
