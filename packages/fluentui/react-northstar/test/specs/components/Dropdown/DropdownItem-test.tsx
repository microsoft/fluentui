import { DropdownItem } from 'src/components/Dropdown/DropdownItem';
import { isConformant } from 'test/specs/commonTests';

describe('DropdownItem', () => {
  isConformant(DropdownItem, {
    testPath: __filename,
    constructorName: 'DropdownItem',
    hasAccessibilityProp: false,
  });
});
