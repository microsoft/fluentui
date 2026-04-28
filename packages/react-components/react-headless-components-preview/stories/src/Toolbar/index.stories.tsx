import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioGroup,
  ToolbarToggleButton,
} from '@fluentui/react-headless-components-preview/toolbar';

import descriptionMd from './ToolbarDescription.md';
import toolbarCss from '../../../../../../bebop/components/toolbar.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'toolbar.module.css', source: toolbarCss }),
  },
};
