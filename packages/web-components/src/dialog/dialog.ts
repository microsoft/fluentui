import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { DialogType } from './dialog.options.js';

/**
 * A Dialog component that provides a customizable dialog element.
 * @extends FASTElement
 *
 * @remarks
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog | `<dialog>`} element.
 *
 * @attr aria-describedby - The ID of the element that describes the dialog.
 * @attr aria-labelledby - The ID of the element that labels the dialog.
 * @attr modal-type - The type of the dialog modal.
 * @attr open - Indicates whether the dialog is open.
 * @attr no-title-action - Indicates whether the dialog has a title action.
 *
 * @csspart dialog - The dialog element.
 * @csspart root - The root element of the dialog.
 * @csspart title - The title section of the dialog.
 * @csspart content - The content section of the dialog.
 * @csspart actions - The actions section of the dialog.
 *
 * @cssproperty --dialog-backdrop - The backdrop color of the dialog.
 *
 * @slot title - Slot for the title of the dialog.
 * @slot title-action - Slot for the title action buttons.
 * @slot - Default slot for the content of the dialog.
 * @slot action - Slot for the action buttons.
 *
 * @summary The Dialog component functions as a customizable dialog element.
 *
 * @tag fluent-dialog
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
   * Method to emit an event before the dialog's open state changes
   * HTML spec proposal: https://github.com/whatwg/html/issues/9733
   */
  public emitBeforeToggle = (): void => {
    this.$emit('beforetoggle', {
      oldState: this.dialog.open ? 'open' : 'closed',
      newState: this.dialog.open ? 'closed' : 'open',
    });
  };

  /**
   * @public
   * Method to emit an event after the dialog's open state changes
   * HTML spec proposal: https://github.com/whatwg/html/issues/9733
   */
  public emitToggle = (): void => {
    this.$emit('toggle', {
      oldState: this.dialog.open ? 'closed' : 'open',
      newState: this.dialog.open ? 'open' : 'closed',
    });
  };

  /**
   * @public
   * Method to show the dialog
   */
  public show(): void {
    Updates.enqueue(() => {
      this.emitBeforeToggle();
      if (this.type === DialogType.alert || this.type === DialogType.modal) {
        this.dialog.showModal();
      } else if (this.type === DialogType.nonModal) {
        this.dialog.show();
      }
      this.emitToggle();
    });
  }

  /**
   * @public
   * Method to hide the dialog
   */
  public hide(): void {
    this.emitBeforeToggle();
    this.dialog.close();
    this.emitToggle();
  }

  /**
   * @public
   * Handles click events on the dialog overlay for light-dismiss
   * @param event - The click event
   * @returns boolean
   */
  public clickHandler(event: Event): boolean {
    event.preventDefault();
    if (this.dialog.open && this.type !== DialogType.alert && event.target === this.dialog) {
      this.hide();
    }
    return true;
  }
}
