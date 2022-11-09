import { fieldConformanceTestOptions } from '@fluentui/react-field';
import { isConformant } from '../../common/isConformant';
import { SpinButtonField } from './SpinButtonField';

describe('SpinButtonField', () => {
  isConformant({
    Component: SpinButtonField,
    displayName: 'SpinButtonField',
    primarySlot: 'control',
    testOptions: fieldConformanceTestOptions,
  });

  // Most functionality is tested by Field.test.tsx, and SpinButton's tests
});
