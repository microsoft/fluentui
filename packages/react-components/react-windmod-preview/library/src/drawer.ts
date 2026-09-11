export { Drawer, drawerClassNames, useDrawerStyles } from './components/Drawer';
export type { DrawerProps, DrawerSize, DrawerSlots, DrawerState } from './components/Drawer';

export { DrawerBody, drawerBodyClassNames, useDrawerBodyStyles } from './components/DrawerBody';
export type { DrawerBodyProps, DrawerBodySlots, DrawerBodyState } from './components/DrawerBody';

export { DrawerFooter, drawerFooterClassNames, useDrawerFooterStyles } from './components/DrawerFooter';
export type { DrawerFooterProps, DrawerFooterSlots, DrawerFooterState } from './components/DrawerFooter';

export { DrawerHeader, drawerHeaderClassNames, useDrawerHeaderStyles } from './components/DrawerHeader';
export type { DrawerHeaderProps, DrawerHeaderSlots, DrawerHeaderState } from './components/DrawerHeader';

export {
  DrawerHeaderNavigation,
  drawerHeaderNavigationClassNames,
  useDrawerHeaderNavigationStyles,
} from './components/DrawerHeaderNavigation';
export type {
  DrawerHeaderNavigationProps,
  DrawerHeaderNavigationSlots,
  DrawerHeaderNavigationState,
} from './components/DrawerHeaderNavigation';

export {
  DrawerHeaderTitle,
  drawerHeaderTitleClassNames,
  useDrawerHeaderTitleStyles,
} from './components/DrawerHeaderTitle';
export type {
  DrawerHeaderTitleProps,
  DrawerHeaderTitleSlots,
  DrawerHeaderTitleState,
} from './components/DrawerHeaderTitle';

export { InlineDrawer, inlineDrawerClassNames, useInlineDrawerStyles } from './components/InlineDrawer';
export type { InlineDrawerProps, InlineDrawerSlots, InlineDrawerState } from './components/InlineDrawer';

export { OverlayDrawer, overlayDrawerClassNames, useOverlayDrawerStyles } from './components/OverlayDrawer';
export type { OverlayDrawerProps, OverlayDrawerSlots, OverlayDrawerState } from './components/OverlayDrawer';

/** Headless building blocks, re-exported for consumers composing their own Drawer. */
export {
  DrawerProvider,
  renderDrawer,
  renderDrawerBody,
  renderDrawerFooter,
  renderDrawerHeader,
  renderDrawerHeaderNavigation,
  renderDrawerHeaderTitle,
  renderInlineDrawer,
  renderOverlayDrawer,
  useDrawer,
  useDrawerBody,
  useDrawerContext,
  useDrawerContextValue,
  useDrawerFooter,
  useDrawerHeader,
  useDrawerHeaderNavigation,
  useDrawerHeaderTitle,
  useInlineDrawer,
  useOverlayDrawer,
} from '@fluentui/react-headless-components-preview/drawer';
export type { DrawerContextValue } from '@fluentui/react-headless-components-preview/drawer';
