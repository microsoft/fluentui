import { Alert } from '../index';

import descriptionMd from './AlertDescription.md';
import bestPracticesMd from './AlertBestPractices.md';

export { Default } from './AlertDefault.stories';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
