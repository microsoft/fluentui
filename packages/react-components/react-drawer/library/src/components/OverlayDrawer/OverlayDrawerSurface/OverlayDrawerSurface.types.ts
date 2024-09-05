import type { DialogSurfaceProps, DialogSurfaceSlots } from '@fluentui/react-dialog';
import type { ComponentProps, Slot } from '@fluentui/react-utilities';

/**
 * OverlayDrawerSurface slots
 */
export type OverlayDrawerSurfaceSlots = Partial<Pick<DialogSurfaceSlots, 'backdrop' | 'backdropMotion'>> & {
  root: Slot<'div', 'aside'>;
};

/**
 * OverlayDrawerSurface Props
 */
export type OverlayDrawerSurfaceProps = ComponentProps<OverlayDrawerSurfaceSlots> &
  Pick<DialogSurfaceProps, 'mountNode'>;
