import type { DialogSurfaceContextValues, DialogSurfaceSlots } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * DrawerOverlaySurface slots
 */
export type DrawerOverlaySurfaceSlots = DialogSurfaceSlots;

/**
 * DrawerOverlaySurface Props
 */
export type DrawerOverlaySurfaceProps = ComponentProps<DrawerOverlaySurfaceSlots>;

/**
 * State used in rendering DrawerOverlaySurface
 */
export type DrawerOverlaySurfaceState = ComponentState<DrawerOverlaySurfaceSlots> & {
  /**
   * Dialog surface context values.
   * This is used to pass context values to the dialog surface.
   */
  dialogSurfaceContextValues: DialogSurfaceContextValues;

  /**
   * Whether the drawer is nested inside another drawer.
   */
  nested: boolean;
};
