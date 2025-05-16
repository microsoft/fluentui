import { attr, FASTElement } from '@microsoft/fast-element';
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
    const path = event.composedPath();

    const dialog = this.parentElement;

    const closeBtn = path.find<Element>((el): el is Element => (el as Element).slot === 'close');

    if (isDialog(dialog) && closeBtn) {
      dialog.hide();
    }

    return true;
  }
}
