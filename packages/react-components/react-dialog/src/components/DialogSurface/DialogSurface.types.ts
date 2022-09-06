import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DialogSurfaceContextValue } from '../../contexts';

export type DialogSurfaceSlots = {
  /**
   * Dimmed background of dialog.
   * The default backdrop is rendered as a `<div>` with styling.
   * This slot expects a `<div>` element which will replace the default backdrop.
   * The backdrop should have `aria-hidden="true"`.
   *
   * By default if `DialogSurface` is `<dialog>` element the backdrop is ignored,
   * since native `<dialog>` element supports [::backdrop](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop)
   */
  backdrop?: Slot<'div'>;
  root: NonNullable<Slot<'div'>>;
};

/** @internal */
export type DialogSurfaceElement = HTMLDialogElement | HTMLDivElement;

/** @internal */
export type DialogSurfaceElementIntersection = HTMLDialogElement & HTMLDivElement;

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
