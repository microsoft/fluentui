import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';

/**
 * A Drawer component that allows content to be displayed in a side panel. It can be rendered as modal or non-modal.
 *
 * @tag fluent-drawer
 *
 * @extends FASTElement
 *
 * @attr {DrawerType} type - Determines whether the drawer should be displayed as modal, non-modal, or alert.
 * @attr {DrawerPosition} position - Sets the position of the drawer (start/end).
 * @attr {DrawerSize} size - Sets the size of the drawer (small/medium/large).
 * @attr {string} ariaDescribedby - The ID of the element that describes the drawer.
 * @attr {string} ariaLabelledby - The ID of the element that labels the drawer.
 *
 * @csspart dialog - The dialog element of the drawer.
 *
 * @slot - Default slot for the content of the drawer.
 *
 * @fires toggle - Event emitted after the dialog's open state changes.
 * @fires beforetoggle - Event emitted before the dialog's open state changes.
 *
 * @method show - Method to show the drawer.
 * @method hide - Method to hide the drawer.
 * @method clickHandler - Handles click events on the drawer.
 * @method cancelHandler - Handles cancel events on the drawer.
 * @method emitToggle - Emits an event after the dialog's open state changes.
 * @method emitBeforeToggle - Emits an event before the dialog's open state changes.
 *
 * @summary A component that provides a drawer for displaying content in a side panel.
 *
 * @tag fluent-drawer
 */
export class Drawer extends FASTElement {
  protected roleAttrObserver!: MutationObserver;

  /**
   * @public
   * Determines whether the drawer should be displayed as modal or non-modal
   * When rendered as a modal, an overlay is applied over the rest of the view.
   */
  @attr
  public type: DrawerType = DrawerType.modal;
  protected typeChanged() {
    if (!this.dialog) {
      return;
    }

    this.updateDialogRole();

    if (this.type === DrawerType.modal) {
      this.dialog.setAttribute('aria-modal', 'true');
    } else {
      this.dialog.removeAttribute('aria-modal');
    }
  }

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

  /** @internal */
  connectedCallback() {
    super.connectedCallback();
    this.typeChanged();
    this.observeRoleAttr();
  }

  /** @internal */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.roleAttrObserver.disconnect();
  }

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
   * Method to show the drawer
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
    if (this.dialog.open && event.target === this.dialog) {
      this.hide();
    }
    return true;
  }

  /**
   * @public
   * Handles cancel events on the drawer.
   */
  public cancelHandler() {
    this.hide();
  }

  protected observeRoleAttr() {
    if (this.roleAttrObserver) {
      return;
    }

    this.roleAttrObserver = new MutationObserver(() => {
      this.updateDialogRole();
    });
    this.roleAttrObserver.observe(this, {
      attributes: true,
      attributeFilter: ['role'],
    });
  }

  protected updateDialogRole() {
    console.log(this.role);
    if (!this.dialog) {
      return;
    }
    this.dialog.role = this.type === DrawerType.modal ? 'dialog' : this.role;
  }
}
