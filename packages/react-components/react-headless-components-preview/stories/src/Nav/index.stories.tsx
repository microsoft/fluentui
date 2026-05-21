import {
  Nav,
  NavItem,
  NavSubItem,
  NavCategory,
  NavCategoryItem,
  NavSubItemGroup,
  NavDivider,
  NavSectionHeader,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerFooter,
} from '@fluentui/react-headless-components-preview/nav';

import descriptionMd from './NavDescription.md';

export { Default } from './NavDefault.stories';
export { WithCategories } from './NavWithCategories.stories';
export { Controlled } from './NavControlled.stories';
export { NavDrawerBasic } from './NavDrawerBasic.stories';
export { NavDrawerControlled } from './NavDrawerControlled.stories';

export default {
  title: 'Components/Nav',
  component: Nav,
  subcomponents: {
    NavItem,
    NavSubItem,
    NavCategory,
    NavCategoryItem,
    NavSubItemGroup,
    NavDivider,
    NavSectionHeader,
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavDrawerFooter,
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
