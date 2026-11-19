import type { NavDrawerState as NavDrawerHeadlessState } from '@fluentui/react-headless-components-preview/nav';

import type { DrawerProps, DrawerSize } from '../Drawer/Drawer.types';
import type { NavProps } from '../Nav/Nav.types';

/** Re-exported so this subpath names every type its props reference — see Drawer.types. */
export type { DrawerSize } from '../Drawer/Drawer.types';
export type { NavDensity } from '../Nav/Nav.types';

/**
 * Windmod NavDrawer props: the windmod drawer's props (which re-add the `size` and `separator` the
 * headless surface drops) crossed with the windmod nav's.
 */
export type NavDrawerProps = DrawerProps & NavProps;

/**
 * Windmod NavDrawer state: the headless state plus the look prop the styles hook reads. `size` is
 * read here and also passes through to the root, which resolves its own default.
 */
export type NavDrawerState = NavDrawerHeadlessState & { size?: DrawerSize };
