import { CalendarPicker } from '@fluentui/react-datepicker';

import descriptionMd from './CalendarPickerDescription.md';
import bestPracticesMd from './CalendarPickerBestPractices.md';

export { Default } from './CalendarPickerDefault.stories';

export default {
  title: 'Preview Components/CalendarPicker',
  component: CalendarPicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
