import type { DialogProps } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MotionState } from '@fluentui/react-motion-preview';

import type { DrawerBaseProps, DrawerBaseState } from '../../shared/DrawerBase.types';
import { DrawerOverlaySurfaceProps } from '../DrawerOverlaySurface/DrawerOverlaySurface.types';

/**
 * DrawerOverlay slots
 */
export type DrawerOverlaySlots = {
  /**
   * Slot for the root element.
   */
  root: Slot<DrawerOverlaySurfaceProps>;

  /**
   * Dimmed background of drawer.
   * The default backdrop is rendered as a `<div>` with styling.
   * This slot expects a `<div>` element which will replace the default backdrop.
   * The backdrop should have `aria-hidden="true"`.
   *
   */
  backdrop?: Slot<'div'>;
};

/**
 * DrawerOverlay internal slots for when using with composition API
 */
export type DrawerOverlayInternalSlots = DrawerOverlaySlots & {
  /**
   * Slot for the dialog component that wraps the drawer.
   */
  dialog: Slot<DialogProps>;
};

/**
 * DrawerOverlay Props
 */
export type DrawerOverlayProps = ComponentProps<DrawerOverlaySlots> &
  Pick<DialogProps, 'modalType' | 'onOpenChange' | 'inertTrapFocus' | 'defaultOpen'> &
  DrawerBaseProps;

/**
 * State used in rendering DrawerOverlay
 */
export type DrawerOverlayState = Omit<ComponentState<DrawerOverlayInternalSlots>, 'backdrop'> &
  Required<
    DrawerBaseState & {
      /**
       * Motion state for the drawer backdrop.
       */
      backdropMotion: MotionState<HTMLDivElement>;
    }
  >;
