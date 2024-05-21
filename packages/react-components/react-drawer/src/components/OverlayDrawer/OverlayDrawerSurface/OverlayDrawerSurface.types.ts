import type { DialogSurfaceProps, DialogSurfaceSlots, DialogSurfaceState } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * OverlayDrawerSurface slots
 */
export type OverlayDrawerSurfaceSlots = Pick<DialogSurfaceSlots, 'backdrop'> & {
  root: Slot<'div', 'aside'>;
};

/**
 * OverlayDrawerSurface Props
 */
export type OverlayDrawerSurfaceProps = ComponentProps<OverlayDrawerSurfaceSlots> &
  Pick<DialogSurfaceProps, 'mountNode'>;

/**
 * State used in rendering OverlayDrawerSurface
 */
export type OverlayDrawerSurfaceState = DialogSurfaceState & ComponentState<OverlayDrawerSurfaceSlots>;
