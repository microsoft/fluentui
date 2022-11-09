import { fieldConformanceTestOptions } from '@fluentui/react-field';
import { isConformant } from '../../common/isConformant';
import { ComboboxField } from './ComboboxField';

describe('ComboboxField', () => {
  isConformant({
    Component: ComboboxField,
    displayName: 'ComboboxField',
    primarySlot: 'control',
    testOptions: fieldConformanceTestOptions,
    disabledTests: ['exported-top-level'], // TODO re-enable once component is exported without _unstable
  });

  // Most functionality is tested by Field.test.tsx, and Combobox's tests
});
