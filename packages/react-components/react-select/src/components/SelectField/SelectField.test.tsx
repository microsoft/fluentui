import { fieldConformanceTestOptions } from '@fluentui/react-field';
import { isConformant } from '../../testing/isConformant';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  isConformant({
    Component: SelectField,
    displayName: 'SelectField',
    primarySlot: 'control',
    testOptions: fieldConformanceTestOptions,
    disabledTests: ['exported-top-level'], // TODO re-enable once component is exported without _unstable
  });

  // Most functionality is tested by Field.test.tsx, and Select's tests
});
