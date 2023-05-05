import { DialogProps, DialogSurfaceProps } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DrawerBaseTypes } from '../../shared/DrawerBase.types';

export type DrawerOverlaySlots = {
  root: Slot<DialogSurfaceProps>;
};

/**
 * DrawerOverlay Props
 */
export type DrawerOverlayProps = ComponentProps<DrawerOverlaySlots> &
  DrawerBaseTypes &
  Pick<DialogProps, 'modalType' | 'open' | 'defaultOpen' | 'onOpenChange' | 'inertTrapFocus'>;

/**
 * State used in rendering DrawerOverlay
 */
export type DrawerOverlayState = ComponentState<DrawerOverlaySlots> &
  DrawerBaseTypes & {
    dialog: DialogProps;
  };
