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
} from '@fluentui/react-windmod-preview';

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

export const DrawerWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DrawerOverlayVrBand {...parts} position="start" size="small" />
  </FluentProvider>
);

export const DrawerEndWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DrawerOverlayVrBand {...parts} position="end" size="medium" />
  </FluentProvider>
);

export const DrawerBottomWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DrawerOverlayVrBand {...parts} position="bottom" size="large" />
  </FluentProvider>
);

export const DrawerFullWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DrawerOverlayVrBand {...parts} position="start" size="full" />
  </FluentProvider>
);

export const DrawerRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <DrawerOverlayVrBand {...parts} position="start" size="small" />
  </FluentProvider>
);

// A body long enough to scroll puts data-scroll-state on the header and the footer at once, which
// is the only band where either separator hairline paints.
export const DrawerScrollWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DrawerOverlayVrBand {...parts} position="start" size="small" lines={40} scrollBody />
  </FluentProvider>
);

export const DrawerInlineWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DrawerInlineVrScene {...parts} Provider={FluentProvider} />
  </FluentProvider>
);
