import { Dialog } from '../index';

import descriptionMd from './DialogDescription.md';
import bestPracticesMd from './DialogBestPractices.md';

export { Default } from './DialogDefault.stories';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
