import { attr, FASTElement, observable, Updates, volatile } from '@microsoft/fast-element';
import { DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';

/**
 * A Drawer component that allows content to be displayed in a side panel. It can be rendered as modal or non-modal.
 *
 * @tag fluent-drawer
 *
 * @extends FASTElement
 *
 * @attr type - Determines whether the drawer should be displayed as modal, non-modal, or alert.
 * @attr position - Sets the position of the drawer (start/end).
 * @attr size - Sets the size of the drawer (small/medium/large).
 * @attr ariaDescribedby - The ID of the element that describes the drawer.
 * @attr ariaLabelledby - The ID of the element that labels the drawer.
 *
 * @csspart dialog - The dialog element of the drawer.
 * @cssprop --drawer-width - Sets the width of the drawer to a custom value (e.g., 300px).
 *
 * @slot - Default slot for the content of the drawer.
 *
 * @fires { ToggleEvent } toggle - Event emitted after the dialog's open state changes.
 * @fires { ToggleEvent } beforetoggle - Event emitted before the dialog's open state changes.
 *
 * @method show - Method to show the drawer.
 * @method hide - Method to hide the drawer.
 * @method clickHandler - Handles click events on the drawer.
 * @method cancelHandler - Handles cancel events on the drawer.
 * @method emitToggle - Emits an event after the dialog's open state changes.
 * @method emitBeforeToggle - Emits an event before the dialog's open state changes.
 *
 * @summary A component that provides a drawer for displaying content in a side panel.
 */
export class Drawer extends FASTElement {
  /**
   * Determines whether the drawer should be displayed as modal or non-modal
   * When rendered as a modal, an overlay is applied over the rest of the view.
   *
   * @public
   */
  @attr
  public type!: DrawerType;

  /**
   * The ID of the element that labels the drawer.
   *
   * @public
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * The ID of the element that describes the drawer.
   *
   * @public
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * Sets the position of the drawer (start/end).
   *
   * @public
   * @defaultValue start
   */
  @attr
  public position: DrawerPosition = DrawerPosition.start;

  @observable
  public role!: string | null;

  /**
   * @public
   * @defaultValue medium
   * Sets the size of the drawer (small/medium/large).
   */
  @attr({ attribute: 'size' })
  public size: DrawerSize = DrawerSize.medium;

  /**
   * The dialog element.
   *
   * @public
   */
  @observable
  public dialog!: HTMLDialogElement;

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
    if (this.dialog && this.type === DrawerType.modal) {
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
  public get dialogRole(): string | null {
    if (this.dialog && this.type === DrawerType.modal) {
      return 'dialog';
    }

    return this.role;
  }

  connectedCallback() {
    super.connectedCallback();

    Updates.enqueue(() => {
      this.type = this.type ?? DrawerType.modal;
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
   * Method to show the drawer
   *
   * @public
   */
  public show(): void {
    Updates.enqueue(() => {
      this.emitBeforeToggle();
      if (this.type === DrawerType.inline || this.type === DrawerType.nonModal) {
        this.dialog.show();
      } else {
        this.dialog.showModal();
      }
      // Using `autofocus` inside a `<dialog>` is implemented inconsistently
      // across browsers, so artificially focusing here. See details:
      // https://codepen.io/marchbox/pen/PwbRmXE
      (this.querySelector('[autofocus]') as HTMLElement)?.focus?.();
      this.emitToggle();
    });
  }

  /**
   * Method to hide the drawer
   *
   * @public
   */
  public hide(): void {
    this.emitBeforeToggle();
    this.dialog.close();
    this.emitToggle();
  }

  /**
   * @public
   * @param event - The click event
   * @returns boolean - Always returns true
   * Handles click events on the drawer.
   */
  public clickHandler(event: Event): boolean {
    if (this.dialog.open && event.target === this.dialog) {
      this.hide();
    }
    return true;
  }

  /**
   * Handles cancel events on the drawer.
   *
   * @public
   */
  public cancelHandler() {
    this.hide();
  }
}
