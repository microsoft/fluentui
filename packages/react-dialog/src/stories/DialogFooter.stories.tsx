import { DialogFooter } from '../index';

import descriptionMd from './DialogFooterDescription.md';
import bestPracticesMd from './DialogFooterBestPractices.md';

export { Default } from './DialogFooterDefault.stories';

export default {
  title: 'Components/DialogFooter',
  component: DialogFooter,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
