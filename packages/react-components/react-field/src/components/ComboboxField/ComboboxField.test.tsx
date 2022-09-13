import { isConformant } from '../../common/isConformant';
import { ComboboxField } from './ComboboxField';

describe('ComboboxField', () => {
  isConformant({
    Component: ComboboxField,
    displayName: 'ComboboxField',
  });

  // Most functionality is tested by Field.test.tsx, and Combobox's tests
});
