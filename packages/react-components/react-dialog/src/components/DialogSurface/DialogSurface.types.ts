import type { ComponentProps, ComponentState, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { DialogSurfaceContextValue } from '../../contexts';
import { MotionShorthand } from '../../../../react-motion-preview/src/index';

export type DialogBackdropProps = ExtractSlotProps<Slot<'div'>> & {
  motion?: MotionShorthand<HTMLDivElement>;
};

export type DialogSurfaceSlots = {
  /**
   * Dimmed background of dialog.
   * The default backdrop is rendered as a `<div>` with styling.
   * This slot expects a `<div>` element which will replace the default backdrop.
   * The backdrop should have `aria-hidden="true"`.
   *
   */
  backdrop?: Slot<DialogBackdropProps>;
  root: Slot<'div'>;
};

/**
 * Union between all possible semantic element that represent a DialogSurface
 */
export type DialogSurfaceElement = HTMLElement;

/**
 * DialogSurface Props
 */
export type DialogSurfaceProps = ComponentProps<DialogSurfaceSlots>;

export type DialogSurfaceContextValues = {
  dialogSurface: DialogSurfaceContextValue;
};

/**
 * State used in rendering DialogSurface
 */
export type DialogSurfaceState = ComponentState<DialogSurfaceSlots>;
