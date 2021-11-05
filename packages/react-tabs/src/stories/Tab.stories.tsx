import { Tab } from '../index';

import descriptionMd from './TabDescription.md';
import bestPracticesMd from './TabBestPractices.md';

export { Default } from './TabDefault.stories';

export default {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
