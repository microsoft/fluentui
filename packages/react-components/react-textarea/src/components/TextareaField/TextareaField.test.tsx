import { isConformant } from '../../common/isConformant';
import { TextareaField } from './TextareaField';

describe('TextareaField', () => {
  isConformant({
    Component: TextareaField,
    displayName: 'TextareaField',
    primarySlot: 'control',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'label text',
            validationState: 'error',
            validationMessage: 'validation message text',
            hint: 'hint text',
          },
        },
      ],
    },
    disabledTests: ['exported-top-level'], // TODO re-enable once component is exported without _unstable
  });

  // Most functionality is tested by Field.test.tsx, and Textarea's tests
});
