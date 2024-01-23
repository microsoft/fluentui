import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { eventAnimationEnd, keyEscape } from '@microsoft/fast-web-utilities';
import { DrawerModalType, DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';

export class Drawer extends FASTElement {
  /**
   * This method is called when the custom element is connected to the document's DOM.
   * It overrides the connectedCallback method from the base class.
   *
   * @remarks
   * The connectedCallback method is necessary to ensure that the component is properly initialized and rendered when it is connected to the DOM.
   * Although the `open` property is initialized to `false` and `openChanged` already calls `show()`, there may be cases where the initial `openChanged` event occurs before the dialog reference (`dialogRef`) is set.
   * By using the `connectedCallback` method, we can ensure that the component is fully set up before any further actions are taken.
   */
  public connectedCallback(): void {
    super.connectedCallback();
    Updates.enqueue(() => {
      this.setComponent();
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
   * Emits a 'cancel' event.
   * @internal
   */
  public cancel(): void {
    this.$emit('cancel');
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
    this.$emit('onOpenChange', { open: this.open });
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
   * Sets the component state based on the `open` property.
   * @public
   */
  public setComponent(): void {
    if (this.open) {
      this.show();
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
      this.cancel();
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
          this.cancel();
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
    this.classList.add('animating');
    if (this.closing) {
      this.classList.add('closing');
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
    this.classList.remove('animating');
    if (this.closing) {
      this.classList.remove('closing');
      this.dialog.close();
      this.open = false;
      this.closing = false;
    }
  }
}
