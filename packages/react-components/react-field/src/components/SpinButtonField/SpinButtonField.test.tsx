import { isConformant } from '../../common/isConformant';
import { SpinButtonField } from './SpinButtonField';

describe('SpinButtonField', () => {
  isConformant({
    Component: SpinButtonField,
    displayName: 'SpinButtonField',
  });

  // Most functionality is tested by Field.test.tsx, and SpinButton's tests
});
