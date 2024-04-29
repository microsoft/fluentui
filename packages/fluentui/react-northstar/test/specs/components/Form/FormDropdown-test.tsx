import { isConformant } from 'test/specs/commonTests';
import { FormDropdown, formDropdownClassName } from 'src/components/Form/FormDropdown';
import { Dropdown, dropdownClassName } from 'src/components/Dropdown/Dropdown';

describe('FormDropdown', () => {
  isConformant(FormDropdown, {
    testPath: __filename,
    constructorName: 'FormDropdown',
    forwardsRefTo: false,
    targetComponent: Dropdown,
    getTargetElement: (result, attr) =>
      attr === 'className'
        ? result.container.querySelector(`.${formDropdownClassName}`)
        : result.container.querySelector(`.${dropdownClassName}`),
  });
});
