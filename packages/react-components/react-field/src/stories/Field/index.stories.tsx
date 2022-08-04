import { Field } from '@fluentui/react-field';

import descriptionMd from './FieldDescription.md';
import bestPracticesMd from './FieldBestPractices.md';

export { Default } from './FieldDefault.stories';
export { LabelAbove } from './FieldLabelAbove.stories';
export { LabelBefore } from './FieldLabelBefore.stories';
export { Required } from './FieldRequired.stories';
export { Status } from './FieldStatus.stories';
export { Size } from './FieldSize.stories';
export { HelperText } from './FieldHelperText.stories';

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
