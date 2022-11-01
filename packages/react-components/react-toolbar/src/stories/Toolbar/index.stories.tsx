import { Toolbar } from '@fluentui/react-toolbar';

import descriptionMd from './ToolbarDescription.md';
import bestPracticesMd from './ToolbarBestPractices.md';

export { Default } from './ToolbarDefault.stories';
export { Small } from './ToolbarSmall.stories';
export { OverflowItems } from './ToolbarOverflow.stories';
export { WithTooltip } from './ToolbarWithTooltip.stories';
export { WithPopover } from './ToolbarWithPopover.stories';
export { Subtle } from './ToolbarSubtle.stories';
export { ControlledToggleButton } from './ToolbarControlledToggleButton.stories';
export { Radio } from './ToolbarRadio.stories';
export { ControlledRadio } from './ToolbarRadioControlled.stories';

export default {
  title: 'Preview Components/Toolbar',
  component: Toolbar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
