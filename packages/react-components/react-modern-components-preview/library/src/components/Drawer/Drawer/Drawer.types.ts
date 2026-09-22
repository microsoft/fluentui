import type {
  DrawerSlots as DrawerBaseSlots,
  DrawerState as DrawerBaseState,
} from '@fluentui/react-headless-components-preview/drawer';
import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { SlideParams } from '@fluentui/react-motion-components-preview';
import type { Slot } from '@fluentui/react-utilities';
import type { InlineDrawerProps } from '../InlineDrawer/InlineDrawer.types';
import type { OverlayDrawerProps } from '../OverlayDrawer/OverlayDrawer.types';

export type DrawerSize = 'small' | 'medium' | 'large' | 'full';

export type DrawerSurfaceMotionSlots = {
  /** Motion applied to the drawer surface. */
  surfaceMotion: Slot<PresenceMotionSlotProps<SlideParams>>;
};

export type DrawerInternalSurfaceMotionSlots = {
  surfaceMotion: NonNullable<Slot<PresenceMotionSlotProps<SlideParams>>>;
};

export type DrawerProps =
  | (Omit<OverlayDrawerProps, 'type'> & {
      /**
       * Type of the drawer.
       *
       * @default 'overlay'
       */
      type?: 'overlay';
    })
  | (Omit<InlineDrawerProps, 'type'> & {
      /**
       * Type of the drawer.
       */
      type: 'inline';
    });

export type DrawerSlots = DrawerBaseSlots;

export type DrawerState = Omit<DrawerBaseState, 'root'> & {
  root: InlineDrawerProps | OverlayDrawerProps;
};
