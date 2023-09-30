import { attr, css, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { isTabbable } from 'tabbable';
import { eventAnimationEnd, keyEscape, keyTab } from '@microsoft/fast-web-utilities';
import { colorNeutralStroke1, colorTransparentStroke } from '../index.js';
import { DrawerModalType, DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';

export class Drawer extends FASTElement {
  private closing: boolean = false;

  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleDocumentKeydown);

    Updates.enqueue(() => {
      this.updateTrapFocus();
      this.setComponent();
    });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleDocumentKeydown);

    this.updateTrapFocus(false);
  }

  /**
   * The content container.
   * @public
   * @remarks
   * HTML Attribute: content
   */
  @observable
  public content?: HTMLElement;

  /**
   * The dialog element.
   * @public
   *
   */
  @observable
  public dialog!: HTMLDialogElement;

  /**
   * The drawer element.
   * @public
   *
   */
  @observable
  public drawer!: HTMLDivElement;

  /**
   * Determines whether the drawer should be displayed as modal, non-modal, or alert.
   * When in modal or alert mode, an overlay is applied over the rest of the view.
   * @public
   * @remarks
   * HTML Attribute: modalType
   */
  @attr({ attribute: 'modal-type' })
  public modalType: DrawerModalType = DrawerModalType.modal;

  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * Enables standard behavior according to the HTML dialog spec where the focus trap involves setting outside elements inert.
   * @public
   * @remarks
   * HTML Attribute: modalType
   */
  @attr({ attribute: 'inert-trap-focus', mode: 'boolean' })
  public inertTrapFocus: boolean = false;

  /**
   * Sets the type of the drawer (overlay/inline).
   * @public
   * @remarks
   * HTML Attribute: type
   * @defaultValue overlay
   */
  @attr
  public type?: DrawerType = DrawerType.overlay;

  /**
   * Sets the position of the drawer (start/end).
   * @public
   * @remarks
   * HTML Attribute: position
   * @defaultValue end
   */
  @attr
  public position?: DrawerPosition;

  /**
   * Determines whether the drawer should be open by default.
   * @public
   * @remarks
   * HTML Attribute: open-default
   * @defaultValue false
   */
  @attr({ attribute: 'open-default', mode: 'boolean' })
  public openDefault: boolean = false;

  /**
   * Determines whether the drawer has a separator line.
   * @public
   * @remarks
   * HTML Attribute: separator
   * @defaultValue false
   */
  @attr({ mode: 'boolean' })
  public separator: boolean = false;

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
   * Getter for the open state of the drawer.
   * @public
   * @returns {boolean} - Returns true if the drawer is open, false otherwise.
   */
  public get open(): boolean {
    return this.dialog.open;
  }

  /**
   * Indicates whether the drawer is currently trapping focus.
   * @internal
   */
  private isTrappingFocus: boolean = false;

  /**
   * Sets the component state based on the `openDefault` property.
   * If `openDefault` is true and the drawer is not open, it opens the drawer.
   * @public
   */
  public setComponent(): void {
    if (this.openDefault && !this.open) {
      this.show();
    }
  }

  /**
   * Opens the drawer if it is not already open.
   * @public
   */
  public async show(): Promise<void> {
    this.openDialog();
  }

  /**
   * Closes the drawer if it is open.
   * @public
   */
  public close(): void {
    this.closeDialog();
  }

  /**
   * Opens the dialog based on the drawer type and modal type.
   * Triggers the opening animation and updates the overflow styles and focus trap if necessary.
   * @private
   */
  private openDialog(): void {
    if (this.type === DrawerType.inline || this.modalType === DrawerModalType.nonModal) {
      this.dialog.show();
    } else {
      this.dialog.showModal();
    }
    this.closing = false;
    this.triggerAnimation();

    Updates.enqueue(() => {
      this.setOverflowStyles();
      if (this.inertTrapFocus) {
        this.updateTrapFocus(true);
      }
    });
    this.$emit('onOpenChange', { open: true });
  }

  /**
   * Closes the dialog if it is open.
   * Triggers the closing animation.
   * @private
   */
  private closeDialog(): void {
    this.closing = true;
    this.triggerAnimation();
  }

  /**
   * Triggers the opening or closing animation on the dialog.
   * Adds an event listener for the animation end event.
   * @private
   */
  private triggerAnimation(): void {
    this.dialog.classList.add('animating');
    if (this.closing) {
      this.dialog.classList.add('closing');
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
    this.dialog.classList.remove('animating');
    if (this.closing) {
      this.dialog.classList.remove('closing');
      this.dialog.close();
      this.$emit('onOpenChange', { open: false });
      this.closing = false;
    }
  }

  /**
   * Handles the keydown event on the document.
   * If the Tab key is pressed, it calls the handleTabKeyDown function.
   *
   * @param {KeyboardEvent} e - The keyboard event.
   * @private
   */
  private handleDocumentKeydown = (e: KeyboardEvent): void => {
    if (!e.defaultPrevented && this.open) {
      switch (e.key) {
        case keyTab:
          this.handleTabKeyDown(e);
          break;
      }
    }
  };

  /**
   * Handles the keydown event.
   *
   * @public
   * @param {KeyboardEvent} e - The keyboard event.
   * @returns {boolean | void} - Returns true by default, void if the key is Escape.
   */
  public handleKeydown = (e: KeyboardEvent): boolean | void => {
    if (e.defaultPrevented) {
      return;
    }
    switch (e.key) {
      case keyEscape:
        if (this.modalType !== DrawerModalType.alert) {
          this.close();
          this.$emit('dismiss');
        }
        break;
      default:
        return true;
    }
  };

  /**
   * @internal
   */
  public handleClick(event: Event): boolean {
    event.preventDefault();
    if (this.open && this.modalType !== DrawerModalType.alert && event.target === this.dialog) {
      this.close();
      this.$emit('dismiss');
    }
    return true;
  }

  /**
   * Handles the Tab key down event.
   * If the drawer is not open or focus trapping is disabled, it does nothing.
   * Otherwise, it gets the bounds of the tab queue and focuses on the appropriate element based on the current focus and whether the Shift key is pressed.
   *
   * @param {KeyboardEvent} e - The keyboard event.
   * @private
   */
  private handleTabKeyDown = (e: KeyboardEvent): void => {
    if (!this.inertTrapFocus || !this.open) {
      return;
    }

    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds();

    if (bounds.length === 0) {
      return;
    }

    if (bounds.length === 1) {
      bounds[0].focus();
      e.preventDefault();
      return;
    }

    if (e.shiftKey && e.target === bounds[0]) {
      bounds[bounds.length - 1].focus();
      e.preventDefault();
    } else if (!e.shiftKey && e.target === bounds[bounds.length - 1]) {
      bounds[0].focus();
      e.preventDefault();
    }

    return;
  };

  /**
   * A function that calls the animation end handler.
   * @private
   */
  private readonly animationEndHandlerFunction = (): void => this.animationEndHandler();

  /**
   * Sets the overflow styles
   * @internal
   */
  private setOverflowStyles(): void {
    if (this.content && this.content.scrollHeight > this.content.clientHeight - 32) {
      this.$fastController.addStyles(css`
        :host {
          --overflow-border: ${colorNeutralStroke1};
        }
      `);
    } else {
      this.$fastController.addStyles(css`
        :host {
          --overflow-border: ${colorTransparentStroke};
        }
      `);
    }
  }

  /**
   * Handles changes to the `trapFocus` property.
   * If the component is connected, it updates the focus trap.
   * @internal
   */
  protected inertTrapFocusChanged = (): void => {
    if (this.$fastController.isConnected) {
      this.updateTrapFocus();
    }
  };

  /**
   * Handles focusing out of the drawer.
   * If the event is not prevented and the focus should be forced on the target element,
   * it focuses on the first element and prevents the default behavior.
   *
   * @internal
   */
  private handleDrawerFocusOut = (e: Event): void => {
    if (!e.defaultPrevented && this.shouldForceFocus(e.target as HTMLElement)) {
      this.focusFirstElement();
      e.preventDefault();
    }
  };

  /**
   * Returns the bounds of the tab queue.
   * The tab queue is a collection of elements that are focusable.
   *
   * @internal
   */
  private getTabQueueBounds = (): (HTMLElement | SVGElement)[] => {
    const bounds: HTMLElement[] = [];
    return Drawer.reduceTabbableItems(bounds, this);
  };

  /**
   * Focuses on the first element in the tab queue if it is tabbable.
   * If the tab queue is empty or the first element is not tabbable, it focuses on the drawer if it is an instance of HTMLDivElement.
   * @internal
   */
  private focusFirstElement = (): void => {
    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds();
    if (bounds.length > 0) {
      bounds[0].focus();
    } else if (this.dialog instanceof HTMLElement) {
      this.dialog!.focus();
    }
  };

  /**
   * Determines if focus should be forced on the current focus element.
   * Focus is forced if the drawer is trapping focus, the current focus element is not contained within the drawer, and the current focus element is not the first element in the tab queue.
   *
   * @param currentFocusElement - The current focus element.
   * @internal
   */
  private shouldForceFocus = (currentFocusElement: Element | null): boolean => {
    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds();
    return (
      this.isTrappingFocus &&
      this.contains(currentFocusElement) &&
      currentFocusElement === bounds[bounds.length - 1] &&
      currentFocusElement !== bounds[0]
    );
  };

  /**
   * Determines if focus should be trapped within the drawer.
   * Focus is trapped if the drawer is open and focus trapping is not disabled.
   *
   * @internal
   */
  private shouldTrapFocus = (): boolean => {
    return this.inertTrapFocus && this.open;
  };

  /**
   * Updates the focus trap based on the current state of the drawer.
   * If the drawer is open and focus trapping is enabled, it adds event listeners for focusin events and animationend events.
   * If the drawer is closed or focus trapping is disabled, it removes these event listeners.
   *
   * @param shouldTrapFocusOverride - Optional parameter to override the default focus trapping behavior.
   * @internal
   */
  private updateTrapFocus = (shouldTrapFocusOverride?: boolean): void => {
    const shouldTrapFocus = shouldTrapFocusOverride === undefined ? this.shouldTrapFocus() : shouldTrapFocusOverride;

    if (shouldTrapFocus && !this.isTrappingFocus) {
      this.isTrappingFocus = true;
      this.dialog.addEventListener('focusout', this.handleDrawerFocusOut);
    } else if (!shouldTrapFocus && this.isTrappingFocus) {
      this.isTrappingFocus = false;
      this.dialog.removeEventListener('focusout', this.handleDrawerFocusOut);
    }
  };

  /**
   * Reduce a collection to only its focusable elements.
   *
   * @internal
   */
  private static reduceTabbableItems(elements: HTMLElement[], element: FASTElement): HTMLElement[] {
    if (element.getAttribute('tabindex') === '-1') {
      return elements;
    }

    if (isTabbable(element) || (Drawer.isFocusableFastElement(element) && Drawer.hasTabbableShadow(element))) {
      elements.push(element);
      return elements;
    }

    return Array.from(element.children).reduce<HTMLElement[]>(
      (elements, currentElement) => Drawer.reduceTabbableItems(elements, currentElement as FASTElement),
      elements,
    );
  }

  /**
   * Test if element is focusable fast element
   *
   * @internal
   */
  private static isFocusableFastElement(element: FASTElement): boolean {
    return !!element.$fastController?.definition.shadowOptions?.delegatesFocus;
  }

  /**
   * Test if the element has a focusable shadow
   *
   * @internal
   */
  private static hasTabbableShadow(element: FASTElement) {
    return Array.from(element.shadowRoot?.querySelectorAll('*') ?? []).some(x => {
      return isTabbable(x);
    });
  }
}
