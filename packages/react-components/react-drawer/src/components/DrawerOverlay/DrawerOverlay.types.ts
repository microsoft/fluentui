import { DialogProps, DialogSurfaceProps } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot, UseTransitionPresenceState } from '@fluentui/react-utilities';
import { DrawerBaseProps, DrawerBaseState } from '../../util/DrawerBase.types';

export type DrawerOverlaySlots = {
  root: Slot<DialogSurfaceProps>;
};

/**
 * DrawerOverlay Props
 */
export type DrawerOverlayProps = ComponentProps<DrawerOverlaySlots> &
  DrawerBaseProps &
  Pick<DialogProps, 'modalType' | 'onOpenChange' | 'inertTrapFocus'>;

/**
 * State used in rendering DrawerOverlay
 */
export type DrawerOverlayState = ComponentState<DrawerOverlaySlots> &
  DrawerBaseProps &
  DrawerBaseState & {
    dialog: DialogProps;
    backdropPresence: UseTransitionPresenceState<HTMLDivElement>;
  };
