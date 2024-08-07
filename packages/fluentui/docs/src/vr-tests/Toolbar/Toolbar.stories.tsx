import { Meta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import ToolbarExampleCustomContentShorthand from '../../examples/components/Toolbar/Content/ToolbarExampleCustomContent.shorthand';
import ToolbarExampleMenuItemToggle from '../../examples/components/Toolbar/Content/ToolbarExampleMenuItemToggle.shorthand';
import ToolbarExampleMenuRadioGroup from '../../examples/components/Toolbar/Content/ToolbarExampleMenuRadioGroup.shorthand';

import ToolbarExample from '../../examples/components/Toolbar/Types/ToolbarExample';

export default { component: Toolbar, title: 'Toolbar' } as Meta<typeof Toolbar>;

export {
  ToolbarExampleCustomContentShorthand,
  ToolbarExampleMenuItemToggle,
  ToolbarExampleMenuRadioGroup,
  ToolbarExample,
};
