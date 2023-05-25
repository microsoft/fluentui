import { DialogProps, DialogSurfaceProps } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DrawerBaseTypes } from '../../util/DrawerBase.types';

export type DrawerOverlaySlots = {
  root: Slot<DialogSurfaceProps>;
};

/**
 * DrawerOverlay Props
 */
export type DrawerOverlayProps = ComponentProps<DrawerOverlaySlots> &
  DrawerBaseTypes &
  Pick<DialogProps, 'modalType' | 'onOpenChange' | 'inertTrapFocus'>;

/**
 * State used in rendering DrawerOverlay
 */
export type DrawerOverlayState = ComponentState<DrawerOverlaySlots> &
  DrawerBaseTypes & {
    dialog: DialogProps;
  };
