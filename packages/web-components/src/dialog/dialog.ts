import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { DialogType } from './dialog.options.js';

/**
 * A Dialog Custom HTML Element.
 *
 * @public
 */
export class Dialog extends FASTElement {
  /**
   * @public
   * The dialog element
   */
  @observable
  public dialog!: HTMLDialogElement;

  /**
   * @public
   * The ID of the element that describes the dialog
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * @public
   * The ID of the element that labels the dialog
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * @public
   * The type of the dialog modal
   */
  @attr
  public type: DialogType = DialogType.modal;

  /**
   * @public
   * Method to emit an event when the dialog's open state changes
   */
  public emitOpenChange = (): void => {
    this.$emit('open', { open: this.dialog.open });
  };

  /**
   * @public
   * Method to show the dialog
   */
  public show(): void {
    Updates.enqueue(() => {
      if (this.type === DialogType.alert || this.type === DialogType.modal) {
        this.dialog.showModal();
      } else if (this.type === DialogType.nonModal) {
        this.dialog.show();
      }
      this.emitOpenChange();
    });
  }

  /**
   * @public
   * Method to hide the dialog
   */
  public hide(): void {
    this.dialog.close();
    this.emitOpenChange();
  }
}
