import { DialogBody } from '../index';

import descriptionMd from './DialogBodyDescription.md';
import bestPracticesMd from './DialogBodyBestPractices.md';

export { Default } from './DialogBodyDefault.stories';

export default {
  title: 'Components/DialogBody',
  component: DialogBody,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
