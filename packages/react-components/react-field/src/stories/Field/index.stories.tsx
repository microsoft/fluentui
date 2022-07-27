import { Field } from '@fluentui/react-field';

import descriptionMd from './FieldDescription.md';
import bestPracticesMd from './FieldBestPractices.md';

export { Default } from './FieldDefault.stories';

export default {
  title: 'Components/Field',
  component: Field,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
