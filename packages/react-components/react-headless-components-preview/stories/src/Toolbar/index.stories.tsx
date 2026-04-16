import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioGroup,
} from '@fluentui/react-headless-components-preview';

import descriptionMd from './ToolbarDescription.md';

export { Default } from './ToolbarDefault.stories';
export { Vertical } from './ToolbarVertical.stories';

export default {
  title: 'Headless Components/Toolbar',
  component: Toolbar,
  subcomponents: { ToolbarButton, ToolbarDivider, ToolbarGroup, ToolbarRadioGroup },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
