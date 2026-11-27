import {
  AppItem,
  AppItemStatic,
  Hamburger,
  Nav,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  SplitNavItem,
} from '@fluentui/react-components';

import descriptionMd from './NavDescription.md';
import accessibilityMd from './NavAccessibility.md';

export { Basic } from './Basic.stories';
export { VariableDensityItems } from './VariableDensityItems.stories';
export { Controlled } from './Controlled.stories';
export { SplitNavItems } from './SplitNavItems.stories';
export { CustomMotion } from './CustomMotion.stories';

export default {
  title: 'Components/Nav',
  component: Nav,
  subcomponents: {
    AppItem,
    AppItemStatic,
    Hamburger,
    NavCategory,
    NavCategoryItem,
    NavDivider,
    NavDrawer,
    NavDrawerBody,
    NavDrawerFooter,
    NavDrawerHeader,
    NavItem,
    NavSectionHeader,
    NavSubItem,
    NavSubItemGroup,
    SplitNavItem,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, accessibilityMd].join('\n'),
      },
    },
  },
};
