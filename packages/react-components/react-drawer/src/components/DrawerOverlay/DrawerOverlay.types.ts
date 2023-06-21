import { DialogProps, DialogSurfaceProps, DialogSurfaceSlots } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DrawerBaseProps } from '../../util/DrawerBase.types';

export type DrawerOverlaySlots = DialogSurfaceSlots & {
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
  DrawerBaseProps & {
    dialog: DialogProps;
  };
