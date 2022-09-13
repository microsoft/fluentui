import { isConformant } from '../../common/isConformant';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  isConformant({
    Component: SelectField,
    displayName: 'SelectField',
  });

  // Most functionality is tested by Field.test.tsx, and Select's tests
});
