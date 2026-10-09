import type { DrawerState as DrawerHeadlessState } from '@fluentui/react-headless-components-preview/drawer';

import type { InlineDrawerProps } from '../InlineDrawer/InlineDrawer.types';
import type { OverlayDrawerProps } from '../OverlayDrawer/OverlayDrawer.types';

export type { DrawerSlots } from '@fluentui/react-headless-components-preview/drawer';

/**
 * Width for a `start`/`end` drawer and height for a `bottom` one. `full` resolves to the viewport
 * width on the inline axis and to the container's height at `bottom`.
 *
 * The headless package re-exports Griffel's base prop types rather than its public ones, so this
 * and `separator` arrive here unnamed; both are pure look and windmod re-adds them.
 */
export type DrawerSize = 'small' | 'medium' | 'large' | 'full';

export type DrawerProps =
  | (OverlayDrawerProps & {
      /**
       * Type of the drawer.
       *
       * @default overlay
       */
      type?: 'overlay';
    })
  | (InlineDrawerProps & {
      /**
       * Type of the drawer.
       *
       * - 'overlay' - Drawer is hidden by default and can be opened by clicking on the trigger.
       * - 'inline' - Drawer is stacked with the content.
       */
      type: 'inline';
    });

export type DrawerState = DrawerHeadlessState;
