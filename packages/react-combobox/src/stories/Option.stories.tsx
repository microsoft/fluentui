import { Option } from '../index';

import descriptionMd from './OptionDescription.md';
import bestPracticesMd from './OptionBestPractices.md';

export { Default } from './OptionDefault.stories';

export default {
  title: 'Components/Option',
  component: Option,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
