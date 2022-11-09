import { isConformant } from '../../common/isConformant';
import { SwitchField } from './SwitchField';

describe('SwitchField', () => {
  isConformant({
    Component: SwitchField,
    displayName: 'SwitchField',
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

  // Most functionality is tested by Field.test.tsx, and Switch's tests
});
