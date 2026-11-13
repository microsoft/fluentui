import type {
  OverlayDrawerProps as OverlayDrawerHeadlessProps,
  OverlayDrawerState as OverlayDrawerHeadlessState,
} from '@fluentui/react-headless-components-preview/drawer';

import type { DrawerSize } from '../Drawer/Drawer.types';

export type { OverlayDrawerSlots } from '@fluentui/react-headless-components-preview/drawer';

/** Re-exported so this subpath names every type its props reference — see Drawer.types. */
export type { DrawerSize } from '../Drawer/Drawer.types';

/** Windmod OverlayDrawer props: the headless props plus `size`. */
export type OverlayDrawerProps = OverlayDrawerHeadlessProps & {
  /**
   * Size of the drawer.
   *
   * @default small
   */
  size?: DrawerSize;
};

export type OverlayDrawerState = OverlayDrawerHeadlessState & {
  size: DrawerSize;
};
