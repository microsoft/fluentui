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
import { SettingsFilled, SettingsRegular } from '@fluentui/react-icons/headless/svg/settings';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const Home = bundleIcon(HomeFilled, HomeRegular);
const Settings = bundleIcon(SettingsFilled, SettingsRegular);

const nav: React.CSSProperties = { width: 280 };

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.row}>
      {(['medium', 'small'] as const).map(density => (
        <Nav
          key={density}
          density={density}
          defaultSelectedValue="home"
          defaultOpenCategories={['reports']}
          style={nav}
        >
          <NavSectionHeader>{density}</NavSectionHeader>
          <NavItem value="home" icon={<Home />}>
            Home
          </NavItem>
          <NavItem value="settings" icon={<Settings />}>
            Settings
          </NavItem>
          <NavDivider />
          <NavCategory value="reports">
            <NavCategoryItem icon={<Home />}>Reports</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="weekly">Weekly</NavSubItem>
              <NavSubItem value="monthly">Monthly</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="archive">
            <NavCategoryItem icon={<Settings />}>Archive</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="2024">2024</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem value="docs" href="#docs">
            Documentation
          </NavItem>
        </Nav>
      ))}
    </div>
  </FluentProvider>
);
