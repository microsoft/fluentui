import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuItemSwitch,
  MenuItemLink,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuSplitGroup,
} from '@fluentui/react-headless-components-preview/menu';

import descriptionMd from './MenuDescription.md';
import bestPracticesMd from './MenuBestPractices.md';

export { Default } from './MenuDefault.stories';
export { Controlled } from './MenuControlled.stories';
export { WithDivider } from './MenuWithDivider.stories';
export { OpenOnHover } from './MenuOpenOnHover.stories';
export { OpenOnContext } from './MenuOpenOnContext.stories';
export { ItemsWithIcons } from './MenuItemsWithIcons.stories';
export { SecondaryContent } from './MenuSecondaryContent.stories';
export { NestedSubmenus } from './MenuNestedSubmenus.stories';
export { CheckboxItems } from './MenuCheckboxItems.stories';
export { RadioItems } from './MenuRadioItems.stories';
export { SwitchItem } from './MenuSwitchItem.stories';
export { ItemLink } from './MenuItemLink.stories';
export { GroupingItems } from './MenuGroupingItems.stories';
export { SplitMenuItem } from './MenuSplitMenuItem.stories';

export default {
  title: 'Headless Components/Menu',
  component: Menu,
  subcomponents: {
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    MenuItemCheckbox,
    MenuItemRadio,
    MenuItemSwitch,
    MenuItemLink,
    MenuDivider,
    MenuGroup,
    MenuGroupHeader,
    MenuSplitGroup,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
