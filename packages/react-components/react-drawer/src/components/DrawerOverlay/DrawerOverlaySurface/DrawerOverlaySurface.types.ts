import type { DialogSurfaceSlots, DialogSurfaceState } from '@fluentui/react-dialog';
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
export type DrawerOverlaySurfaceState = ComponentState<DrawerOverlaySurfaceSlots> & DialogSurfaceState;
