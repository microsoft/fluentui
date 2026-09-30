import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';

import descriptionMd from './TimePickerDescription.md';

import { getBrowserSupportNotice } from '../shared/browserSupportNotice';

export { Default } from './TimePickerDefault.stories';
export { Controlled } from './TimePickerControlled.stories';
export { Freeform } from './TimePickerFreeform.stories';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('TimePicker')].join('\n'),
      },
    },
  },
};
