import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  ToolbarToggleButton,
} from '@fluentui/react-headless-components-preview/toolbar';

import descriptionMd from './ToolbarDescription.md';
export { Default } from './ToolbarDefault.stories';
export { Vertical } from './ToolbarVertical.stories';
export { Toggle } from './ToolbarToggleButton.stories';
export { RadioButton } from './ToolbarRadioButton.stories';

export default {
  title: 'Headless Components/Toolbar',
  component: Toolbar,
  subcomponents: {
    ToolbarButton,
    ToolbarDivider,
    ToolbarGroup,
    ToolbarRadioButton,
    ToolbarRadioGroup,
    ToolbarToggleButton,
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
