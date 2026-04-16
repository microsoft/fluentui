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
export type DialogSurfaceProps = ComponentProps<DialogSurfaceSlots> & {
  /**
   * Event handler called when the dialog opens and auto-focuses its first tabbable element.
   * Call `event.preventDefault()` to suppress the built-in auto-focus and take full control
   * of where focus lands (e.g. to focus a specific element instead).
   */
  onMountAutoFocus?: (event: Event) => void;

  /**
   * Event handler called when the dialog closes and focus is about to be restored.
   * For **non-modal** dialogs, calling `event.preventDefault()` suppresses the built-in
   * restore so the focused element does not change. For **modal / alert** dialogs the
   * browser restores focus natively (via `dialog.close()`), so `preventDefault` has no effect.
   */
  onUnmountAutoFocus?: (event: Event) => void;
};

/**
 * State used in rendering DialogSurface
 */
export type DialogSurfaceState = ComponentState<DialogSurfaceSlots> & {
  open: boolean;
  unmountOnClose: boolean;
  modalType: DialogModalType;
};
