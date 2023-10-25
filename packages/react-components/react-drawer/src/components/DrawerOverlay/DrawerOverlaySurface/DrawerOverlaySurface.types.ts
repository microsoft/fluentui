import type { DialogSurfaceProps, DialogSurfaceSlots, DialogSurfaceState } from '@fluentui/react-dialog';
import type { ComponentState } from '@fluentui/react-utilities';

/**
 * DrawerOverlaySurface slots
 */
export type DrawerOverlaySurfaceSlots = DialogSurfaceSlots;

/**
 * DrawerOverlaySurface Props
 */
export type DrawerOverlaySurfaceProps = DialogSurfaceProps;

/**
 * State used in rendering DrawerOverlaySurface
 */
export type DrawerOverlaySurfaceState = ComponentState<DrawerOverlaySurfaceSlots> & DialogSurfaceState;
