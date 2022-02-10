import { Listbox } from '../index';

import descriptionMd from './ListboxDescription.md';
import bestPracticesMd from './ListboxBestPractices.md';

export { Default } from './ListboxDefault.stories';

export default {
  title: 'Components/Listbox',
  component: Listbox,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
