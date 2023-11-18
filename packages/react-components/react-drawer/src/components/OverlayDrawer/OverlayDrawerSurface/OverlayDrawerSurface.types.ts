import type { DialogSurfaceSlots, DialogSurfaceState } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * OverlayDrawerSurface slots
 */
export type OverlayDrawerSurfaceSlots = DialogSurfaceSlots;

/**
 * OverlayDrawerSurface Props
 */
export type OverlayDrawerSurfaceProps = ComponentProps<OverlayDrawerSurfaceSlots>;

/**
 * State used in rendering OverlayDrawerSurface
 */
export type OverlayDrawerSurfaceState = ComponentState<OverlayDrawerSurfaceSlots> & DialogSurfaceState;
