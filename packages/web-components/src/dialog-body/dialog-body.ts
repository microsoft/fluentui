import { FASTElement } from '@microsoft/fast-element';
import { isDialog } from '../dialog/dialog.options';
/**
 * Dialog Body component that extends the FASTElement class.
 *
 * @tag fluent-dialog-body
 *
 * @public
 * @extends FASTElement
 */
export class DialogBody extends FASTElement {
  /**
   * Handles click event for the close slot
   *
   * @param e - the click event
   * @internal
   */
  public clickHandler(event: PointerEvent): boolean | void {
    if (!event.defaultPrevented) {
      const dialog = this.parentElement;

      if (isDialog(dialog)) {
        dialog.hide();
      }
    }

    return true;
  }
}
