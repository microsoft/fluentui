import { handlesAccessibility, isConformant } from 'test/specs/commonTests';

import { ToolbarMenuRadioGroup } from 'src/components/Toolbar/ToolbarMenuRadioGroup';
import { ToolbarMenuRadioGroupWrapper } from 'src/components/Toolbar/ToolbarMenuRadioGroupWrapper';

describe('ToolbarMenuRadioGroup', () => {
  isConformant(ToolbarMenuRadioGroup, {
    testPath: __filename,
    wrapperComponent: ToolbarMenuRadioGroupWrapper,
    constructorName: 'ToolbarMenuRadioGroup',
    getTargetElement: result => result.container.querySelector(`[data-aa-class="ToolbarMenuRadioGroup"]`),
  });

  describe('accessibility', () => {
    handlesAccessibility(ToolbarMenuRadioGroup, {
      defaultRootRole: 'presentation',
      partSelector: 'ul',
      usesWrapperSlot: true,
    });
  });
});
