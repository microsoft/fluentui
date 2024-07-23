import type { DialogProps } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

import type { DrawerBaseProps, DrawerBaseState } from '../../shared/DrawerBase.types';
import { OverlayDrawerSurfaceProps } from './OverlayDrawerSurface';

/**
 * OverlayDrawer slots
 */
export type OverlayDrawerSlots = {
  /**
   * Slot for the root element.
   */
  root: Slot<OverlayDrawerSurfaceProps>;
};

/**
 * OverlayDrawer internal slots for when using with composition API
 */
export type OverlayDrawerInternalSlots = OverlayDrawerSlots & {
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
