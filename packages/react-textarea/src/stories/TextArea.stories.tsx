import { TextArea } from '../index';

import descriptionMd from './TextAreaDescription.md';
import bestPracticesMd from './TextAreaBestPractices.md';

export { Default } from './TextAreaDefault.stories';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
