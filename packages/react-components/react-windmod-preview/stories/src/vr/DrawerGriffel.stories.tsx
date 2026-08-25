import * as React from 'react';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  FluentProvider,
  InlineDrawer,
  OverlayDrawer,
  webLightTheme,
} from '@fluentui/react-components';

import { DrawerInlineVrScene, DrawerOverlayVrBand } from './DrawerVrScene';

const parts = {
  OverlayDrawer: OverlayDrawer as never,
  InlineDrawer: InlineDrawer as never,
  DrawerHeader: DrawerHeader as never,
  DrawerHeaderTitle: DrawerHeaderTitle as never,
  DrawerHeaderNavigation: DrawerHeaderNavigation as never,
  DrawerBody: DrawerBody as never,
  DrawerFooter: DrawerFooter as never,
  Button: Button as never,
};

export const DrawerGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DrawerOverlayVrBand {...parts} position="start" size="small" />
  </FluentProvider>
);

export const DrawerEndGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DrawerOverlayVrBand {...parts} position="end" size="medium" />
  </FluentProvider>
);

export const DrawerBottomGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DrawerOverlayVrBand {...parts} position="bottom" size="large" />
  </FluentProvider>
);

export const DrawerFullGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DrawerOverlayVrBand {...parts} position="start" size="full" />
  </FluentProvider>
);

export const DrawerRtlGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
    <DrawerOverlayVrBand {...parts} position="start" size="small" />
  </FluentProvider>
);

export const DrawerScrollGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DrawerOverlayVrBand {...parts} position="start" size="small" lines={40} scrollBody />
  </FluentProvider>
);

export const DrawerInlineGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DrawerInlineVrScene {...parts} Provider={FluentProvider as never} />
  </FluentProvider>
);
