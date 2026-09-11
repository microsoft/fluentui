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

import { NavDrawerInlineVrScene, NavDrawerOverlayVrBand } from './NavDrawerVrScene';

const parts = {
  NavDrawer: NavDrawer as never,
  NavDrawerHeader: NavDrawerHeader as never,
  NavDrawerBody: NavDrawerBody as never,
  NavDrawerFooter: NavDrawerFooter as never,
  NavItem: NavItem as never,
  Button: Button as never,
};

export const NavDrawerInlineWindmod = (): React.ReactNode => (
  <FluentProvider>
    <NavDrawerInlineVrScene {...parts} Provider={FluentProvider} />
  </FluentProvider>
);

export const NavDrawerWindmod = (): React.ReactNode => (
  <FluentProvider>
    <NavDrawerOverlayVrBand {...parts} />
  </FluentProvider>
);

export const NavDrawerRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <NavDrawerOverlayVrBand {...parts} />
  </FluentProvider>
);
