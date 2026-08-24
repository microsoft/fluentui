import * as React from 'react';
import { FluentProvider, Nav, NavDivider, NavItem, NavSectionHeader } from '@fluentui/react-windmod-preview';
import { HomeFilled, HomeRegular } from '@fluentui/react-icons/headless/svg/home';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { NavVrScene } from './NavVrScene';

const Home = bundleIcon(HomeFilled, HomeRegular);

export const NavWindmod = (): React.ReactNode => (
  <FluentProvider>
    <NavVrScene Nav={Nav} NavItem={NavItem} NavSectionHeader={NavSectionHeader} NavDivider={NavDivider} Icon={Home} />
  </FluentProvider>
);
