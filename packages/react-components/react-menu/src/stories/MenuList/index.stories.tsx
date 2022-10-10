import { MenuList } from '@fluentui/react-components';
import descriptionMd from './MenuListDescription.md';

export { Default } from './MenuListDefault.stories';
export { MenuListWithNestedSubmenus } from './MenuListNestedSubmenus.stories';
export { CheckboxItems } from './CheckboxItems.stories';
export { RadioItems } from './RadioItems.stories';
export { ControlledCheckboxItems } from './CheckboxItemsControlled.stories';
export { ControlledRadioItems } from './RadioItemsControlled.stories';

export default {
  title: 'Components/Menu/MenuList',
  component: MenuList,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
