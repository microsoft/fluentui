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
  root: Slot<'div'>;
};

/**
 * Union between all possible semantic element that represent a DialogSurface
 */
export type DialogSurfaceElement = HTMLDialogElement | HTMLDivElement;

/** @internal */
export type DialogSurfaceElementIntersection = HTMLDialogElement & HTMLDivElement;

/**
 * DialogSurface Props
 *
 * Omits basic types from native `dialog` (`open`, `onCancel` and `onClose`)
 * to ensure `onOpenChange`, `open` and `defaultOpen` from `Dialog` is used instead
 */
export type DialogSurfaceProps = Omit<ComponentProps<DialogSurfaceSlots>, 'open' | 'onCancel' | 'onClose'>;

export type DialogSurfaceContextValues = {
  dialogSurface: DialogSurfaceContextValue;
};

/**
 * State used in rendering DialogSurface
 */
export type DialogSurfaceState = ComponentState<DialogSurfaceSlots>;
