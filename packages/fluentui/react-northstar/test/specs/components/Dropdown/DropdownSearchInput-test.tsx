import { DropdownSearchInput, dropdownSearchInputSlotClassNames } from 'src/components/Dropdown/DropdownSearchInput';
import { isConformant } from 'test/specs/commonTests';

describe('DropdownSearchInput', () => {
  isConformant(DropdownSearchInput, {
    constructorName: 'DropdownSearchInput',
    hasAccessibilityProp: false,
    handlesAsProp: false,
    eventTargets: {
      onKeyUp: `.${dropdownSearchInputSlotClassNames.input}`,
      onFocus: `.${dropdownSearchInputSlotClassNames.input}`,
    },
  });
});
