import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { DialogModalType } from '../dialogContext';

export type DialogSurfaceSlots = {
  /**
   * The native HTML `<dialog>` element.
   * Opened as modal via `showModal()` or non-modal via `showPopover()`.
   * The `::backdrop` CSS pseudo-element provides the native backdrop for modal dialogs.
   */
  root: Slot<'dialog'>;
};

/**
 * DialogSurface Props
 */
export type DialogSurfaceProps = ComponentProps<DialogSurfaceSlots>;

/**
 * State used in rendering DialogSurface
 */
export type DialogSurfaceState = ComponentState<DialogSurfaceSlots> & {
  /**
   * Whether the dialog is open. Mirrors DialogContext's `open` value.
   */
  open: boolean;
  /**
   * Whether the `<dialog>` element should be removed from the DOM when closed.
   * Mirrors DialogContext's `unmountOnClose` value.
   */
  unmountOnClose: boolean;
  /**
   * Modality of the dialog. Mirrors DialogContext's `modalType`.
   * - `modal` / `alert`: opened via `showModal()`; rendered into the browser top layer.
   * - `non-modal`: opened via `showPopover()` with `popover="manual"`, entering
   *   the browser top layer while keeping open/close fully React-controlled.
   */
  modalType: DialogModalType;
  /**
   * Whether the `<dialog>` element should be present in the DOM this render.
   *
   * Stays true during native close and any running, finite exit animations on the
   * surface or its pseudo-elements. Native close restores focus immediately;
   * consumer CSS controls whether the surface remains visible during its exit.
   */
  shouldRender: boolean;
};
