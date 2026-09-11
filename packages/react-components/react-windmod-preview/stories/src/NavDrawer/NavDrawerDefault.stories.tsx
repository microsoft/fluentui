import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
} from '@fluentui/react-windmod-preview/nav';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { HomeFilled, HomeRegular } from '@fluentui/react-icons/headless/svg/home';
import { SettingsFilled, SettingsRegular } from '@fluentui/react-icons/headless/svg/settings';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const Home = bundleIcon(HomeFilled, HomeRegular);
const Settings = bundleIcon(SettingsFilled, SettingsRegular);

const frame: React.CSSProperties = { height: 420, display: 'flex' };

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.row}>
      {(['medium', 'small'] as const).map(density => (
        <div key={density} style={frame}>
          <NavDrawer type="inline" open density={density} defaultSelectedValue="home">
            <NavDrawerHeader>
              <Button appearance="subtle">Menu</Button>
            </NavDrawerHeader>
            <NavDrawerBody>
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
            </NavDrawerBody>
            <NavDrawerFooter>
              <Button>Sign out</Button>
            </NavDrawerFooter>
          </NavDrawer>
        </div>
      ))}
    </div>
  </FluentProvider>
);
