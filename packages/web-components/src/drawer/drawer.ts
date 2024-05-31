import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { eventAnimationEnd, keyEscape } from '@microsoft/fast-web-utilities';
import { DrawerModalType, DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';

/**
 * Drawer
 *
 * A Drawer component for creating modal or non-modal drawers with various configurations.
 * @extends FASTElement
 *
 * @attr {DrawerModalType} type - Determines whether the drawer should be displayed as modal, non-modal, or alert. When in modal or alert mode, an overlay is applied over the rest of the view.
 * @attr {string} aria-labelledby - The ID of the element that labels the drawer.
 * @attr {string} aria-describedby - The ID of the element that describes the drawer.
 * @attr {DrawerType} type - Sets the type of the drawer (overlay/inline).
 * @attr {DrawerPosition} position - Sets the position of the drawer (start/end).
 * @attr {DrawerSize} size - Sets the size of the drawer (small/medium/large).
 *
 * @csspart dialog - The dialog element that represents the drawer.
 *
 * @slot - Default slot for the drawer's content.
 *
 * @fires dismiss - Emitted when the drawer is dismissed.
 *
 * @method connectedCallback() - Called when the custom element is connected to the document's DOM.
 * @method disconnectedCallback() - Called when the custom element is disconnected from the document's DOM.
 * @method show() - Opens the drawer if it is currently hidden.
 * @method hide() - Closes the drawer if it is currently open.
 * @method clickHandler(event) - Handles click events on the drawer.
 * @method keydownHandler(event) - Handles keydown events on the drawer.
 * @method openChanged(oldValue, newValue) - Handles changes to the `open` property.
 * @method typeChanged(oldValue, newValue) - Handles changes to the `type` attribute.
 *
 * @summary A flexible drawer component that can be used in various configurations such as modal, non-modal, alert, inline, overlay, with different sizes and positions.
 *
 * @tag fluent-drawer
 */

export class Drawer extends FASTElement {
  /**
   * The dialog element.
   * @public
   *
   */
  @observable
  public dialog!: HTMLDialogElement;

  /**
   * Determines whether the drawer should be displayed as modal, non-modal, or alert.
   * When in modal or alert mode, an overlay is applied over the rest of the view.
   * @public
   */
  @attr({ attribute: 'type' })
  public type: DrawerModalType = DrawerModalType.modal;

  /**
   * The ID of the element that labels the drawer.
   * @public
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * The ID of the element that describes the drawer.
   * @public
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * Sets the drawer as inline
   * @public
   * @defaultValue false
   */
  @attr({ mode: 'boolean' })
  public inline: boolean = false;

  /**
   * Sets the position of the drawer (start/end).
   * @public
   * @defaultValue start
   */
  @attr
  public position?: DrawerPosition;

  /**
   * Sets the size of the drawer (small/medium/large).
   * @public
   * @defaultValue medium
   */
  @attr({ attribute: 'size' })
  public size?: DrawerSize;

  /**
   * Method to emit an event when the dialog is dismissed
   */
  public dismiss(): void {
    this.$emit('dismiss');
  }

  /**
   * Method to emit an event when the dialog's open state changes
   * @public
   */
  public emitOpenChange = (): void => {
    this.$emit('open', { open: this.dialog.open });
  };

  /**
   * @public
   * Method called when the 'type' attribute changes
   */
  public inlineChanged(oldValue: boolean, newValue: boolean): void {
    if (this.$fastController.isConnected) {
      if (newValue) {
        this.type = DrawerModalType.nonModal;
      }
    }
  }

  /**
   * Opens the drawer if it is currently hidden.
   * @public
   */
  public show(): void {
    if (!this.dialog.open) {
      if (this.inline || this.type === DrawerModalType.nonModal) {
        this.dialog.show();
      } else {
        this.dialog.showModal();
      }
    }
  }

  /**
   * Closes the drawer if it is currently open.
   * @public
   */
  public hide(): void {
    if (this.dialog.open) {
      this.dialog.close();
    }
  }

  /**
   * Handles click events on the drawer.
   *
   * @param event - The click event
   * @returns boolean - Always returns true
   * @public
   */
  public clickHandler(event: Event): boolean {
    event.preventDefault();
    if (this.dialog.open && this.type !== DrawerModalType.alert && event.target === this.dialog) {
      this.hide();
      this.dismiss();
    }
    return true;
  }

  /**
   * @public
   * Handles keydown events on the drawer
   * @param e - The keydown event
   * @returns boolean | void
   */
  public keydownHandler = (event: KeyboardEvent): boolean | void => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case keyEscape:
        event.preventDefault();

        if (this.type !== DrawerModalType.alert) {
          this.hide();
          this.dismiss();
        }
        break;
      default:
        return true;
    }
  };
}
