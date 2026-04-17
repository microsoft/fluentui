import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { DialogModalType } from '../dialogContext';

export type DialogSurfaceMountAutoFocusData = EventData<'focusScope.autoFocusOnMount', Event>;

export type DialogSurfaceUnmountAutoFocusData = EventData<'focusScope.autoFocusOnUnmount', Event>;

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
  onMountAutoFocus?: EventHandler<DialogSurfaceMountAutoFocusData>;

  /**
   * Event handler called when the dialog closes and focus is about to be restored.
   * Calling `event.preventDefault()` suppresses the built-in focus restore for all dialog types,
   * allowing consumers to take full control of post-close focus.
   */
  onUnmountAutoFocus?: EventHandler<DialogSurfaceUnmountAutoFocusData>;
};

/**
 * State used in rendering DialogSurface
 */
export type DialogSurfaceState = ComponentState<DialogSurfaceSlots> & {
  open: boolean;
  unmountOnClose: boolean;
  modalType: DialogModalType;
};
