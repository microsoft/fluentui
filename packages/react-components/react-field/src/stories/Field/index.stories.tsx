import { Field } from '@fluentui/react-field';

import descriptionMd from './FieldDescription.md';
import bestPracticesMd from './FieldBestPractices.md';

export { Default } from './FieldDefault.stories';
export { AllControls } from './FieldDefault.stories';
export { LabelBefore } from './FieldDefault.stories';
export { Required } from './FieldDefault.stories';
export { Status } from './FieldDefault.stories';
export { Validation } from './FieldDefault.stories';
export { Size } from './FieldDefault.stories';
export { HelperText } from './FieldDefault.stories';

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
