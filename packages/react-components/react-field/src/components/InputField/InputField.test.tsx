import { fieldConformanceTestOptions } from '@fluentui/react-field';
import { isConformant } from '../../common/isConformant';
import { InputField } from './InputField';

describe('InputField', () => {
  isConformant({
    Component: InputField,
    displayName: 'InputField',
    primarySlot: 'control',
    testOptions: fieldConformanceTestOptions,
  });

  // Most functionality is tested by Field.test.tsx, and Input's tests
});
