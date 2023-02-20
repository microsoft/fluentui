import { DropdownSearchInput, dropdownSearchInputSlotClassNames } from 'src/components/Dropdown/DropdownSearchInput';
import { isConformant } from 'test/specs/commonTests';

describe('DropdownSearchInput', () => {
  isConformant(DropdownSearchInput, {
    testPath: __filename,
    constructorName: 'DropdownSearchInput',
    hasAccessibilityProp: false,
    skipAsPropTests: 'all',
    disabledTests: ['component-has-root-ref'],
    eventTargets: {
      onKeyUp: `.${dropdownSearchInputSlotClassNames.input}`,
      onFocus: `.${dropdownSearchInputSlotClassNames.input}`,
    },
  });
});
