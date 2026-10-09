import type {
  InlineDrawerProps as InlineDrawerHeadlessProps,
  InlineDrawerState as InlineDrawerHeadlessState,
} from '@fluentui/react-headless-components-preview/drawer';

import type { DrawerSize } from '../Drawer/Drawer.types';

export type { InlineDrawerSlots } from '@fluentui/react-headless-components-preview/drawer';

/** Re-exported so this subpath names every type its props reference — see Drawer.types. */
export type { DrawerSize } from '../Drawer/Drawer.types';

/**
 * Windmod InlineDrawer props: the headless props plus `size` and `separator`. `separator` has no
 * OverlayDrawer counterpart, matching Griffel.
 */
export type InlineDrawerProps = InlineDrawerHeadlessProps & {
  /**
   * Size of the drawer.
   *
   * @default small
   */
  size?: DrawerSize;

  /**
   * Draws a visible border between the drawer and the content it is stacked with.
   *
   * @default false
   */
  separator?: boolean;
};

export type InlineDrawerState = InlineDrawerHeadlessState & {
  size: DrawerSize;
  separator: boolean;
};
