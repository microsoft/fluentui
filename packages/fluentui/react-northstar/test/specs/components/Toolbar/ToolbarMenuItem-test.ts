import { implementsShorthandProp, isConformant } from 'test/specs/commonTests';

import { Box } from 'src/components/Box/Box';
import { ToolbarMenu } from 'src/components/Toolbar/ToolbarMenu';
import { ToolbarMenuItem, toolbarMenuItemClassName } from 'src/components/Toolbar/ToolbarMenuItem';

describe('ToolbarMenuItem', () => {
  isConformant(ToolbarMenuItem, {
    testPath: __filename,
    wrapperComponent: Box,
    autoControlledProps: ['menuOpen'],
    constructorName: 'ToolbarMenuItem',
    getTargetElement: result => result.container.querySelector(`.${toolbarMenuItemClassName}`),
  });
  implementsShorthandProp(ToolbarMenuItem)('menu', ToolbarMenu, {
    implementsPopper: true,
    requiredProps: { menuOpen: true },
  });
});
