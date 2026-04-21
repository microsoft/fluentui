import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioGroup,
  ToolbarToggleButton,
} from '@fluentui/react-headless-components-preview';

import descriptionMd from './ToolbarDescription.md';

export { Default } from './ToolbarDefault.stories';
export { Vertical } from './ToolbarVertical.stories';
export { Toggle } from './ToolbarToggleButton.stories';

export default {
  title: 'Headless Components/Toolbar',
  component: Toolbar,
  subcomponents: { ToolbarButton, ToolbarDivider, ToolbarGroup, ToolbarRadioGroup, ToolbarToggleButton },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
