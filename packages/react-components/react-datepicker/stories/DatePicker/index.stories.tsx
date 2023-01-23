import { DatePicker } from '@fluentui/react-datepicker';

import descriptionMd from './DatePickerDescription.md';
import bestPracticesMd from './DatePickerBestPractices.md';

export { Default } from './DatePickerDefault.stories';

export default {
  title: 'Preview Components/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
