import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { DialogModalType } from '../dialogContext';

export type DialogSurfaceSlots = {
  /**
   * The native HTML `<dialog>` element.
   * Opened as modal via `showModal()` or non-modal via `show()`.
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
   * - `non-modal`: opened via `show()`; portalled into `document.body` to escape ancestor
   *   stacking contexts (`overflow`, `clip-path`, `transform`).
   */
  modalType: DialogModalType;
  /**
   * Whether the `<dialog>` element should be present in the DOM this render.
   *
   * Equals `open || !unmountOnClose`, except when `open` flips from true to false with
   * `unmountOnClose: true` — then it stays true for one extra render so the layout
   * effect can call `dialog.close()` on the still-connected element, which lets the
   * browser run its native close-the-dialog focus restoration.
   */
  shouldRender: boolean;
};
