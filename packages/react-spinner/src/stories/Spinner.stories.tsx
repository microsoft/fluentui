import { Spinner } from '../index';

import descriptionMd from './SpinnerDescription.md';
import bestPracticesMd from './SpinnerBestPractices.md';

export { Default } from './SpinnerDefault.stories';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
