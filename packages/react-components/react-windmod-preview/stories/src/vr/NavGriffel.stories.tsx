import * as React from 'react';
import {
  FluentProvider,
  Nav,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  webLightTheme,
} from '@fluentui/react-components';
import { bundleIcon, HomeFilled, HomeRegular } from '@fluentui/react-icons';

import { NavVrScene } from './NavVrScene';

const Home = bundleIcon(HomeFilled, HomeRegular);

export const NavGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
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
