import * as React from 'react';
import { FluentProvider, Nav, NavDivider, NavItem, NavSectionHeader } from '@fluentui/react-windmod-preview';
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
        <Nav key={density} density={density} defaultSelectedValue="home" style={nav}>
          <NavSectionHeader>{density}</NavSectionHeader>
          <NavItem value="home" icon={<Home />}>
            Home
          </NavItem>
          <NavItem value="settings" icon={<Settings />}>
            Settings
          </NavItem>
          <NavDivider />
          <NavItem value="docs" href="#docs">
            Documentation
          </NavItem>
        </Nav>
      ))}
    </div>
  </FluentProvider>
);
