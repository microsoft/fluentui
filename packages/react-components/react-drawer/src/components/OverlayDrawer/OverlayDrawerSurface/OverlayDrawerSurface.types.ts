import type { DialogSurfaceProps, DialogSurfaceSlots, DialogSurfaceState } from '@fluentui/react-dialog';
import type { ComponentState } from '@fluentui/react-utilities';

/**
 * OverlayDrawerSurface slots
 */
export type OverlayDrawerSurfaceSlots = DialogSurfaceSlots;

/**
 * OverlayDrawerSurface Props
 */
export type OverlayDrawerSurfaceProps = DialogSurfaceProps;

/**
 * State used in rendering OverlayDrawerSurface
 */
export type OverlayDrawerSurfaceState = ComponentState<OverlayDrawerSurfaceSlots> & DialogSurfaceState;
