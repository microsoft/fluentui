import { FASTElement } from '@microsoft/fast-element';
import { isDialog } from '../dialog/dialog.options.js';
/**
 * Dialog Body component that extends the FASTElement class.
 *
 * @tag fluent-dialog-body
 *
 * @slot title - Content for the dialog title.
 * @slot title-action - Content for actions shown near the title.
 * @slot close - Content for the close action.
 * @slot action - Content for footer actions.
 * @slot - Default dialog body content.
 * @csspart title - The title container.
 * @csspart content - The content container.
 * @csspart actions - The actions container.
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
