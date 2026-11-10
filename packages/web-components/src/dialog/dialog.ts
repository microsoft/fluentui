import { attr, FASTElement, observable, Updates, volatile } from '@microsoft/fast-element';
import { DialogType } from './dialog.options.js';

/**
 * A Dialog Custom HTML Element.
 *
 * @tag fluent-dialog
 *
 * @fires { ToggleEvent } toggle - Event emitted after the dialog's open state changes.
 * @fires { ToggleEvent } beforetoggle - Event emitted before the dialog's open state changes.
 * @slot - The default slot. {@link (DialogBody:class)} element recommended.
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
  public type!: DialogType;

  /**
   * The `aria-describedby` attribute value for the dialog, which is determined by the `ariaDescribedby` property. This
   * is used to ensure that the dialog's accessible description is properly announced by assistive technologies.
   *
   * @internal
   */
  @volatile
  public get dialogDescribedby(): string | undefined {
    if (this.dialog) {
      return this.ariaDescribedby;
    }
  }

  /**
   * The `aria-label` attribute value for the dialog, which is determined by the `ariaLabel` property. This is used to
   * ensure that the dialog's accessible name is properly announced by assistive technologies.
   *
   * @internal
   */
  @volatile
  public get dialogLabel(): string | null | undefined {
    if (this.dialog) {
      return this.ariaLabel;
    }
  }

  /**
   * The `aria-labelledby` attribute value for the dialog, which is determined by the `ariaLabelledby` property. This is
   * used to ensure that the dialog's accessible name is properly announced by assistive technologies.
   *
   * @internal
   */
  @volatile
  public get dialogLabelledby(): string | undefined {
    if (this.dialog) {
      return this.ariaLabelledby;
    }
  }

  /**
   * The modal state of the dialog, which is determined by the `type` property. If the dialog is not a non-modal dialog,
   * the modal state will be true, otherwise it will be undefined.
   *
   * @internal
   */
  @volatile
  public get dialogModal(): boolean | undefined {
    if (this.dialog && this.type !== DialogType.nonModal) {
      return true;
    }
  }

  /**
   * The role of the dialog, which is determined by the `type` property. If the dialog is an alert dialog, the role will
   * be 'alertdialog', otherwise it will be undefined.
   *
   * @internal
   */
  @volatile
  public get dialogRole(): string | undefined {
    if (this.dialog && this.type === DialogType.alert) {
      return 'alertdialog';
    }
  }

  connectedCallback() {
    super.connectedCallback();

    Updates.enqueue(() => {
      this.type = this.type ?? DialogType.modal;
    });
  }

  /**
   * Method to emit an event before the dialog's open state changes
   * HTML spec proposal: https://github.com/whatwg/html/issues/9733
   *
   * @public
   */
  public emitBeforeToggle(): void {
    this.$emit('beforetoggle', {
      oldState: this.dialog.open ? 'open' : 'closed',
      newState: this.dialog.open ? 'closed' : 'open',
    });
  }

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
      // Using `autofocus` inside a `<dialog>` is implemented inconsistently
      // across browsers, so artificially focusing here. See details:
      // https://codepen.io/marchbox/pen/PwbRmXE
      (this.querySelector('[autofocus]') as HTMLElement)?.focus?.();
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
