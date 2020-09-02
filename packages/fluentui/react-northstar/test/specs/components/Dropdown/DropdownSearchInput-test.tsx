import { DropdownSearchInput, dropdownSearchInputSlotClassNames } from 'src/components/Dropdown/DropdownSearchInput';
import { isConformant } from 'test/specs/commonTests';

describe('DropdownSearchInput', () => {
  isConformant(DropdownSearchInput, {
    testPath: __filename,
    constructorName: 'DropdownSearchInput',
    hasAccessibilityProp: false,
    disabledTests: ['as-renders-fc', 'as-passes-as-value', 'as-renders-html', 'as-renders-react-class'],
    eventTargets: {
      onKeyUp: `.${dropdownSearchInputSlotClassNames.input}`,
      onFocus: `.${dropdownSearchInputSlotClassNames.input}`,
    },
  });
});
