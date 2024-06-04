import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { keyEscape } from '@microsoft/fast-web-utilities';
import { DrawerType, DrawerPosition, DrawerSize } from './drawer.options.js';

/**
 * Drawer
 *
 * A Drawer component for creating modal or non-modal drawers with various configurations.
 * @extends FASTElement
 *
 * @attr {DrawerType} type - Determines whether the drawer should be displayed as modal, non-modal, or alert. When in modal or alert mode, an overlay is applied over the rest of the view.
 * @attr {boolean} inline - Sets the drawer as an inline element.
 * @attr {DrawerPosition} position - Sets the position of the drawer (start/end).
 * @attr {DrawerSize} size - Sets the size of the drawer (small/medium/large).
 * @attr {string} aria-labelledby - The ID of the element that labels the drawer.
 * @attr {string} aria-describedby - The ID of the element that describes the drawer.
 *
 * @csspart dialog - The dialog element that represents the drawer.
 *
 * @slot - Default slot for the drawer's content.
 *
 * @fires toggle - Emitted after the drawer's open state changes
 * @fires beforeToggle - Emitted before the drawer's open state changes
 *
 * @method connectedCallback() - Called when the custom element is connected to the document's DOM.
 * @method show() - Opens the drawer if it is currently hidden.
 * @method hide() - Closes the drawer if it is currently open.
 * @method clickHandler(event) - Handles click events on the drawer.
 * @method keydownHandler(event) - Handles keydown events on the drawer.
 * @method typeChanged(oldValue, newValue) - Handles changes to the `type` attribute.
 * @method inlineChanged(oldValue, newValue) - Handles changes to the `inline` attribute.
 *
 * @summary A flexible drawer component that can be used in various configurations such as modal, non-modal, alert, inline, overlay, with different sizes and positions.
 *
 * @tag fluent-drawer
 */
export class Drawer extends FASTElement {
  /**
   * @public
   * The connectedCallback method of the custom element
   */
  public connectedCallback(): void {
    super.connectedCallback();
    Updates.enqueue(() => {
      this.validateConfiguration();
    });
  }

  /**
   * @public
   * Determines whether the drawer should be displayed as modal, non-modal, or alert.
   * When in modal or alert mode, an overlay is applied over the rest of the view.
   */
  @attr({ attribute: 'type' })
  public type: DrawerType = DrawerType.modal;

  /**
   * @public
   * The ID of the element that labels the drawer.
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * @public
   * The ID of the element that describes the drawer.
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * @public
   * @defaultValue false
   * Sets the drawer as inline
   */
  @attr({ mode: 'boolean' })
  public inline?: boolean = false;

  /**""
   * @public
   * @defaultValue start
   * Sets the position of the drawer (start/end).
   */
  @attr
  public position: DrawerPosition = DrawerPosition.start;

  /**
   * @public
   * @defaultValue medium
   * Sets the size of the drawer (small/medium/large).
   */
  @attr({ attribute: 'size' })
  public size: DrawerSize = DrawerSize.medium;

  /**
   * @public
   * The dialog element.
   */
  @observable
  public dialog!: HTMLDialogElement;

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
   * Method to emit an event after the dialog's open state changes
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
   * Method called when the 'inline' attribute changes
   */
  public inlineChanged(oldValue: boolean, newValue: boolean): void {
    if (this.$fastController.isConnected) {
      if (newValue) {
        this.validateConfiguration();
      }
    }
  }

  /**
   * @public
   * Method called when the 'type' attribute changes
   */
  public typeChanged(oldValue: boolean, newValue: boolean): void {
    if (this.$fastController.isConnected) {
      if (newValue != oldValue) {
        this.validateConfiguration();
      }
    }
  }

  /**
   * @public
   * Method to show the drawer
   */
  public show(): void {
    Updates.enqueue(() => {
      this.emitBeforeToggle();
      if (this.inline) {
        this.dialog.show();
      } else {
        this.dialog.showModal();
      }
      this.emitToggle();
    });
  }

  /**
   * @public
   * Method to hide the drawer
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
    event.preventDefault();
    if (this.dialog.open && this.type !== DrawerType.alert && event.target === this.dialog) {
      this.hide();
    }
    return true;
  }

  /**
   * @public
   * @param e - The keydown event
   * @returns boolean | void
   * Handles keydown events on the drawer
   */
  public keydownHandler = (event: KeyboardEvent): boolean | void => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case keyEscape:
        event.preventDefault();

        if (this.type !== DrawerType.alert) {
          this.hide();
        }
        break;
      default:
        return true;
    }
  };

  /**
   * Validates the configuration of the drawer.
   * @throws {Error} Throws an error if the configuration is invalid.
   */
  private validateConfiguration(): void {
    if (this.inline && this.type !== DrawerType.nonModal) {
      throw new Error('Invalid configuration: inline requires the type to be nonModal');
    }
  }
}
