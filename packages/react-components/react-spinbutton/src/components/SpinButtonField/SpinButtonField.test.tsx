import { fieldConformanceTestOptions } from '@fluentui/react-field';
import { isConformant } from '../../common/isConformant';
import { SpinButtonField } from './SpinButtonField';

describe('SpinButtonField', () => {
  isConformant({
    Component: SpinButtonField,
    displayName: 'SpinButtonField',
    primarySlot: 'control',
    testOptions: fieldConformanceTestOptions,
    disabledTests: ['exported-top-level'], // TODO re-enable once component is exported without _unstable
  });

  // Most functionality is tested by Field.test.tsx, and SpinButton's tests
});
