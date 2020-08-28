import { DropdownItem } from 'src/components/Dropdown/DropdownItem';
import { isConformant } from 'test/specs/commonTests';

describe('DropdownItem', () => {
  isConformant(DropdownItem, {
    constructorName: 'DropdownItem',
    hasAccessibilityProp: false,
  });
});
