import * as React from 'react';
import {
  Button,
  FluentProvider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
  webLightTheme,
} from '@fluentui/react-components';

import { NavDrawerInlineVrScene, NavDrawerOverlayVrBand } from './NavDrawerVrScene';

const parts = {
  NavDrawer: NavDrawer as never,
  NavDrawerHeader: NavDrawerHeader as never,
  NavDrawerBody: NavDrawerBody as never,
  NavDrawerFooter: NavDrawerFooter as never,
  NavItem: NavItem as never,
  Button: Button as never,
};

export const NavDrawerInlineGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <NavDrawerInlineVrScene {...parts} Provider={FluentProvider as never} />
  </FluentProvider>
);

export const NavDrawerGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <NavDrawerOverlayVrBand {...parts} />
  </FluentProvider>
);

export const NavDrawerRtlGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
    <NavDrawerOverlayVrBand {...parts} />
  </FluentProvider>
);
