import { fieldConformanceTestOptions } from '@fluentui/react-field';
import { isConformant } from '../../common/isConformant';
import { SwitchField } from './SwitchField';

describe('SwitchField', () => {
  isConformant({
    Component: SwitchField,
    displayName: 'SwitchField',
    primarySlot: 'control',
    testOptions: fieldConformanceTestOptions,
  });

  // Most functionality is tested by Field.test.tsx, and Switch's tests
});
