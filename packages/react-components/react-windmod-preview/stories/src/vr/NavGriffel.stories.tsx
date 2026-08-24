import * as React from 'react';
import { FluentProvider, Nav, NavDivider, NavItem, NavSectionHeader, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, HomeFilled, HomeRegular } from '@fluentui/react-icons';

import { NavVrScene } from './NavVrScene';

const Home = bundleIcon(HomeFilled, HomeRegular);

export const NavGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <NavVrScene Nav={Nav} NavItem={NavItem} NavSectionHeader={NavSectionHeader} NavDivider={NavDivider} Icon={Home} />
  </FluentProvider>
);
