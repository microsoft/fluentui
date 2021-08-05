import { DropdownSearchInput, dropdownSearchInputSlotClassNames } from 'src/components/Dropdown/DropdownSearchInput';
import { isConformant } from 'test/specs/commonTests';

describe('DropdownSearchInput', () => {
  isConformant(DropdownSearchInput, {
    testPath: __filename,
    constructorName: 'DropdownSearchInput',
    hasAccessibilityProp: false,
    skipAsPropTests: true,
    eventTargets: {
      onKeyUp: `.${dropdownSearchInputSlotClassNames.input}`,
      onFocus: `.${dropdownSearchInputSlotClassNames.input}`,
    },
  });
});
