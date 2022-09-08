import { isConformant } from '../../common/isConformant';
import { InputField } from './InputField';

describe('InputField', () => {
  isConformant({
    Component: InputField,
    displayName: 'InputField',
  });

  // Most functionality is tested by Field.test.tsx, and Input's tests
});
