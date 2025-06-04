import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';

/**
 * A Drawer component that allows content to be displayed in a side panel. It can be rendered as modal or non-modal.
 *
 * @tag fluent-drawer
 *
 * @extends FASTElement
 *
 * @csspart dialog - The dialog element of the drawer.
 *
 * @slot - Default slot for the content of the drawer.
 *
 * @fires toggle - Event emitted after the dialog's open state changes.
 * @fires beforetoggle - Event emitted before the dialog's open state changes.
 *
 * @summary A component that provides a drawer for displaying content in a side panel.
 *
 * @tag fluent-drawer
 */
export class Drawer extends FASTElement {
  /**
   * Determines whether the drawer should be displayed as modal or non-modal
   * When rendered as a modal, an overlay is applied over the rest of the view.
   * @public
   */
  @attr
  public type: DrawerType = DrawerType.modal;

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
   * Sets the position of the drawer (start/end).
   * @public
   */
  @attr
  public position: DrawerPosition = DrawerPosition.start;

  /**
   * Sets the size of the drawer (small/medium/large).
   * @public
   */
  @attr({ attribute: 'size' })
  public size: DrawerSize = DrawerSize.medium;

  /**
   * The dialog element.
   * @internal
   */
  @observable
  public dialog!: HTMLDialogElement;

  /**
   * Method to emit an event after the dialog's open state changes
   * HTML spec proposal: https://github.com/whatwg/html/issues/9733
   * @internal
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
   * @internal
   */
  public emitBeforeToggle = (): void => {
    this.$emit('beforetoggle', {
      oldState: this.dialog.open ? 'open' : 'closed',
      newState: this.dialog.open ? 'closed' : 'open',
    });
  };

  /**
   * Method to show the drawer
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
      this.emitToggle();
    });
  }

  /**
   * Method to hide the drawer
   * @public
   */
  public hide(): void {
    this.emitBeforeToggle();
    this.dialog.close();
    this.emitToggle();
  }

  /**
   * Handles click events on the drawer.
   * @internal
   * @param event - The click event
   * @returns boolean - Always returns true
   */
  public clickHandler(event: Event): boolean {
    event.preventDefault();
    if (this.dialog.open && event.target === this.dialog) {
      this.hide();
    }
    return true;
  }
}
