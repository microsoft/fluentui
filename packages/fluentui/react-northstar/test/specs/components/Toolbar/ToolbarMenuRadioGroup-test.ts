import { handlesAccessibility, isConformant } from 'test/specs/commonTests';

import Box from 'src/components/Box/Box';
import ToolbarMenuRadioGroup from 'src/components/Toolbar/ToolbarMenuRadioGroup';

describe('ToolbarMenuRadioGroup', () => {
  isConformant(ToolbarMenuRadioGroup, {
    wrapperComponent: Box,
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
