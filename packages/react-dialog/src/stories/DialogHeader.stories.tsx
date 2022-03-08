import { DialogHeader } from '../index';

import descriptionMd from './DialogHeaderDescription.md';
import bestPracticesMd from './DialogHeaderBestPractices.md';

export { Default } from './DialogHeaderDefault.stories';

export default {
  title: 'Components/DialogHeader',
  component: DialogHeader,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
