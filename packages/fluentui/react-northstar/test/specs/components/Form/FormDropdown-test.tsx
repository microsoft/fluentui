import { isConformant } from 'test/specs/commonTests';
import { FormDropdown } from 'src/components/Form/FormDropdown';
import { Dropdown } from 'src/components/Dropdown/Dropdown';

describe('FormDropdown', () => {
  isConformant(FormDropdown, {
    constructorName: 'FormDropdown',
    forwardsRefTo: false,
    passesUnhandledPropsTo: Dropdown,
  });
});
