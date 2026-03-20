import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { DialogType } from './dialog.options.js';

/**
 * A Dialog Custom HTML Element.
 *
 * @tag fluent-dialog
 *
 * @public
 */
export class Dialog extends FASTElement {
  /**
   * The dialog element
   *
   * @public
   */
  @observable
  public dialog!: HTMLDialogElement;

  /**
   * The ID of the element that describes the dialog
   *
   * @public
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * The ID of the element that labels the dialog
   *
   * @public
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * The label of the dialog
   *
   * @public
   */
  @attr({ attribute: 'aria-label' })
  public ariaLabel!: string | null;

  /**
   * The type of the dialog modal
   *
   * @public
   */
  @attr
  public type: DialogType = DialogType.modal;
  protected typeChanged(prev: DialogType | undefined, next: DialogType | undefined) {
    if (!this.dialog) {
      return;
    }

    if (next === DialogType.alert) {
      this.dialog.setAttribute('role', 'alertdialog');
    } else {
      this.dialog.removeAttribute('role');
    }

    if (next !== DialogType.nonModal) {
      this.dialog.setAttribute('aria-modal', 'true');
    } else {
      this.dialog.removeAttribute('aria-modal');
    }
  }

  /** @internal */
  connectedCallback() {
    super.connectedCallback();
    this.typeChanged(undefined, this.type);
  }

  /**
   * Method to emit an event before the dialog's open state changes
   * HTML spec proposal: https://github.com/whatwg/html/issues/9733
   *
   * @public
   */
  public emitBeforeToggle = (): void => {
    this.$emit('beforetoggle', {
      oldState: this.dialog.open ? 'open' : 'closed',
      newState: this.dialog.open ? 'closed' : 'open',
    });
  };

  /**
   * Method to emit an event after the dialog's open state changes
   * HTML spec proposal: https://github.com/whatwg/html/issues/9733
   *
   * @public
   */
  public emitToggle = (): void => {
    this.$emit('toggle', {
      oldState: this.dialog.open ? 'closed' : 'open',
      newState: this.dialog.open ? 'open' : 'closed',
    });
  };

  /**
   * Method to show the dialog
   *
   * @public
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
   * Method to hide the dialog
   *
   * @public
   */
  public hide(): void {
    this.emitBeforeToggle();
    this.dialog.close();
    this.emitToggle();
  }

  /**
   * Handles click events on the dialog overlay for light-dismiss
   *
   * @public
   * @param event - The click event
   * @returns boolean
   */
  public clickHandler(event: Event): boolean {
    if (this.dialog.open && this.type !== DialogType.alert && event.target === this.dialog) {
      this.hide();
    }

    return true;
  }
}
