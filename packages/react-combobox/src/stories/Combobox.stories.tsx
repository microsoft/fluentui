import { Combobox } from '../index';

import descriptionMd from './ComboboxDescription.md';
import bestPracticesMd from './ComboboxBestPractices.md';

export { Default } from './ComboboxDefault.stories';

export default {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
