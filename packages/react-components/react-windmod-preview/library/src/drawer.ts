export { Drawer, drawerClassNames, useDrawerStyles } from './components/Drawer';
export type { DrawerProps, DrawerSize, DrawerSlots, DrawerState } from './components/Drawer';

/** Headless building blocks, re-exported for consumers composing their own Drawer. */
export {
  DrawerProvider,
  renderDrawer,
  useDrawer,
  useDrawerContext,
  useDrawerContextValue,
} from '@fluentui/react-headless-components-preview/drawer';
export type { DrawerContextValue } from '@fluentui/react-headless-components-preview/drawer';
