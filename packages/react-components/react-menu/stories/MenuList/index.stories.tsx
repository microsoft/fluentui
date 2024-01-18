import {
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuItemLink,
  MenuItemRadio,
  MenuList,
  MenuSplitGroup,
} from '@fluentui/react-components';
import descriptionMd from './MenuListDescription.md';

export { Default } from './MenuListDefault.stories';
export { MenuListWithNestedSubmenus } from './MenuListNestedSubmenus.stories';
export { CheckboxItems } from './MenuListCheckboxItems.stories';
export { RadioItems } from './MenuListRadioItems.stories';
export { ControlledCheckboxItems } from './MenuListControlledCheckboxItems.stories';
export { ControlledRadioItems } from './MenuListControlledRadioItems.stories';

export default {
  title: 'Components/Menu/MenuList',
  component: MenuList,
  subcomponents: {
    MenuDivider,
    MenuGroup,
    MenuGroupHeader,
    MenuItem,
    MenuItemCheckbox,
    MenuItemLink,
    MenuItemRadio,
    MenuSplitGroup,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
