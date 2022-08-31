import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DialogSurfaceContextValue } from '../../contexts';

export type DialogSurfaceSlots = {
  root: Slot<'div', 'main'>;
};

/**
 * DialogSurface Props
 */
export type DialogSurfaceProps = ComponentProps<DialogSurfaceSlots> & {};

export type DialogSurfaceContextValues = {
  dialogSurface: DialogSurfaceContextValue;
};

/**
 * State used in rendering DialogSurface
 */
export type DialogSurfaceState = ComponentState<DialogSurfaceSlots>;
