import { isConformant } from 'test/specs/commonTests';
import FormDropdown from 'src/components/Form/FormDropdown';

describe('FormDropdown', () => {
  isConformant(FormDropdown, {
    constructorName: 'FormDropdown',
    passesUnhandledPropsTo: 'Dropdown',
  });
});
