import * as React from 'react';
import {
  Nav,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-windmod-preview/nav';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { HomeFilled, HomeRegular } from '@fluentui/react-icons/headless/svg/home';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { NavVrScene } from './NavVrScene';

const Home = bundleIcon(HomeFilled, HomeRegular);

export const NavWindmod = (): React.ReactNode => (
  <FluentProvider>
    <NavVrScene
      Nav={Nav}
      NavItem={NavItem}
      NavSectionHeader={NavSectionHeader}
      NavDivider={NavDivider}
      NavCategory={NavCategory}
      NavCategoryItem={NavCategoryItem}
      NavSubItem={NavSubItem}
      NavSubItemGroup={NavSubItemGroup}
      Icon={Home}
    />
  </FluentProvider>
);
