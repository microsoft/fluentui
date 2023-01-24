import { isConformant } from '../../testing/isConformant';
import { DropdownField } from './DropdownField';

describe('DropdownField', () => {
  isConformant({
    Component: DropdownField,
    displayName: 'DropdownField',
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

  // Most functionality is tested by Field.test.tsx, and Dropdown's tests
});
