import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
} from '@fluentui/react-windmod-preview/nav';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { HomeFilled, HomeRegular } from '@fluentui/react-icons/headless/svg/home';
import { SettingsFilled, SettingsRegular } from '@fluentui/react-icons/headless/svg/settings';
import { bundleIcon } from '@fluentui/react-icons/headless';

const Home = bundleIcon(HomeFilled, HomeRegular);
const Settings = bundleIcon(SettingsFilled, SettingsRegular);

export const Overlay = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <FluentProvider>
      <Button appearance="primary" onClick={() => setOpen(true)}>
        Open nav drawer
      </Button>

      <NavDrawer open={open} onOpenChange={(_, data) => setOpen(data.open)} defaultSelectedValue="home">
        <NavDrawerHeader>
          <Button appearance="subtle" onClick={() => setOpen(false)}>
            Close
          </Button>
        </NavDrawerHeader>
        <NavDrawerBody>
          <NavItem value="home" icon={<Home />}>
            Home
          </NavItem>
          <NavItem value="settings" icon={<Settings />}>
            Settings
          </NavItem>
        </NavDrawerBody>
        <NavDrawerFooter>
          <Button>Sign out</Button>
        </NavDrawerFooter>
      </NavDrawer>
    </FluentProvider>
  );
};
