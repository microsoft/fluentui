import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { eventAnimationEnd, keyEscape } from '@microsoft/fast-web-utilities';
import { DrawerModalType, DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';

export class Drawer extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();
    /**
     * By placing the syncDialogOpenState() inside Updates.enqueue(), we ensure that any actions to synchronize the component's state based on initial attributes are deferred until after all other pending DOM updates are processed.
     * This ensures that the internal state of the dialog element aligns with the initial attributes specified on the <fluent-drawer>, such as automatically opening the dialog when the 'open' attribute is present at the time of connection to the DOM.
     */
    Updates.enqueue(() => {
      this.syncDialogOpenState();
    });
  }

  /**
   * This method is called when the custom element is disconnected from the document's DOM.
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

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
   * @remarks
   * HTML Attribute: modalType
   */
  @attr({ attribute: 'modal-type' })
  public modalType: DrawerModalType = DrawerModalType.modal;

  /**
   * The ID of the element that labels the drawer.
   * @public
   * @remarks
   * HTML Attribute: aria-labelledby
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * The ID of the element that describes the drawer.
   * @public
   * @remarks
   * HTML Attribute: aria-describedby
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * Sets the type of the drawer (overlay/inline).
   * @public
   * @remarks
   * HTML Attribute: type
   * @defaultValue overlay
   */
  @attr
  public type?: DrawerType;

  /**
   * Sets the position of the drawer (start/end).
   * @public
   * @remarks
   * HTML Attribute: position
   * @defaultValue start
   */
  @attr
  public position?: DrawerPosition;

  /**
   * Sets the size of the drawer (small/medium/large).
   * @public
   * @remarks
   * HTML Attribute: size
   * @defaultValue medium
   */
  @attr({ attribute: 'size' })
  public size?: DrawerSize;

  /**
   * Sets the open state of the drawer
   * @public
   * @remarks
   * HTML Attribute: open
   * @defaultValue false
   */
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  /**
   * Indicates whether the drawer is currently closing.
   */
  private closing: boolean = false;

  /**
   * Ensures the dialog's visibility aligns with the `open` property.
   */
  private syncDialogOpenState(): void {
    if (this.open) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Emits a 'cancel' event.
   * @internal
   */
  public dismiss(): void {
    this.$emit('dismiss');
  }

  /**
   * Handles changes to the `open` property.
   * @public
   */
  public openChanged(oldValue: boolean, newValue: boolean): void {
    if (this.$fastController.isConnected) {
      if (newValue) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  /**
   * @public
   * Method called when the 'modalType' attribute changes
   */
  public typeChanged(oldValue: DrawerType, newValue: DrawerType): void {
    if (newValue !== oldValue) {
      if (newValue == DrawerType.inline) {
        this.modalType = DrawerModalType.nonModal;
      }
    }
  }

  /**
   * Opens the drawer if it is currently hidden.
   * @public
   */
  public show(): void {
    if (!this.dialog.open) {
      if (this.type === DrawerType.inline || this.modalType === DrawerModalType.nonModal) {
        this.dialog.show();
      } else {
        this.dialog.showModal();
      }
      this.open = true;
      this.closing = false;
      this.triggerAnimation();
    }
  }

  /**
   * Closes the drawer if it is currently open.
   * @public
   */
  public hide(): void {
    if (this.dialog.open) {
      this.closing = true;
      Updates.enqueue(() => {
        this.triggerAnimation();
      });
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
    if (this.open && this.modalType !== DrawerModalType.alert && event.target === this.dialog) {
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

        if (this.modalType !== DrawerModalType.alert) {
          this.hide();
          this.dismiss();
        }
        break;
      default:
        return true;
    }
  };

  /**
   * A function that calls the animation end handler.
   * @private
   */
  private readonly animationEndHandlerFunction = (): void => this.animationEndHandler();

  /**
   * Triggers the opening or closing animation on the drawer.
   * @private
   */
  private triggerAnimation(): void {
    this.setAttribute('data-animating', '');
    if (this.closing) {
      this.setAttribute('data-closing', '');
    }
    this.dialog.addEventListener(eventAnimationEnd, this.animationEndHandlerFunction);
  }

  /**
   * Handles the end of the animation.
   * @private
   *
   */
  private animationEndHandler(): void {
    this.dialog.removeEventListener(eventAnimationEnd, this.animationEndHandlerFunction);
    this.removeAttribute('data-animating');
    if (this.closing) {
      this.removeAttribute('data-closing');
      this.dialog.close();
      this.open = false;
      this.closing = false;
    }
  }
}
