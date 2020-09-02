import { handlesAccessibility, isConformant } from 'test/specs/commonTests';

import { ToolbarMenuRadioGroup } from 'src/components/Toolbar/ToolbarMenuRadioGroup';
import { ToolbarMenuRadioGroupWrapper } from 'src/components/Toolbar/ToolbarMenuRadioGroupWrapper';

describe('ToolbarMenuRadioGroup', () => {
  isConformant(ToolbarMenuRadioGroup, {
    wrapperComponent: ToolbarMenuRadioGroupWrapper,
    constructorName: 'ToolbarMenuRadioGroup',
  });

  describe('accessibility', () => {
    handlesAccessibility(ToolbarMenuRadioGroup, {
      defaultRootRole: 'group',
      partSelector: 'ul',
      usesWrapperSlot: true,
    });
  });
});
