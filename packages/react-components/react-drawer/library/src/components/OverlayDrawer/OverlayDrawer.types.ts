import type { DialogProps } from '@fluentui/react-dialog';
import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

import type { DrawerMotionParams, OverlayDrawerSurfaceMotionParams } from '../../shared/drawerMotions';
import type { DrawerBaseProps, DrawerBaseState } from '../../shared/DrawerBase.types';
import type { OverlayDrawerSurfaceProps } from './OverlayDrawerSurface';

/**
 * OverlayDrawer slots
 */
export type OverlayDrawerSlots = {
  /**
   * Slot for the root element.
   */
  root: Slot<OverlayDrawerSurfaceProps>;

  backdropMotion?: Slot<PresenceMotionSlotProps<OverlayDrawerSurfaceMotionParams>>;
  surfaceMotion?: Slot<PresenceMotionSlotProps<DrawerMotionParams>>;
};

/**
 * OverlayDrawer internal slots for when using with composition API
 */
export type OverlayDrawerInternalSlots = Pick<OverlayDrawerSlots, 'root'> & {
  /**
   * Slot for the dialog component that wraps the drawer.
   */
  dialog: Slot<DialogProps>;
};

/**
 * OverlayDrawer Props
 */
export type OverlayDrawerProps = ComponentProps<OverlayDrawerSlots> &
  Pick<DialogProps, 'modalType' | 'onOpenChange' | 'inertTrapFocus'> &
  DrawerBaseProps & {
    /**
     * @deprecated OverlayDrawer can work only as a controlled component
     * and does not support uncontrolled mode i.e. defaultOpen prop
     */
    defaultOpen?: boolean;
  };

/**
 * State used in rendering OverlayDrawer
 */
export type OverlayDrawerState = ComponentState<OverlayDrawerInternalSlots> & Required<DrawerBaseState>;
