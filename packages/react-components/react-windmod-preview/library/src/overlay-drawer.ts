export { OverlayDrawer, overlayDrawerClassNames, useOverlayDrawerStyles } from './components/OverlayDrawer';
export type {
  DrawerSize,
  OverlayDrawerProps,
  OverlayDrawerSlots,
  OverlayDrawerState,
} from './components/OverlayDrawer';

/** Headless building blocks, re-exported for consumers composing their own OverlayDrawer. */
export { renderOverlayDrawer, useOverlayDrawer } from '@fluentui/react-headless-components-preview/drawer';
