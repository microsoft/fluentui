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
  public clickHandler(event: MouseEvent): boolean | void {
    if (!event.defaultPrevented) {
      const dialog = this.parentElement;

      if (isDialog(dialog)) {
        dialog.hide();
      }
    }

    return true;
  }
}
