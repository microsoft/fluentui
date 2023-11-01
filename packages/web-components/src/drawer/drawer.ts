import { attr, css, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { isTabbable } from 'tabbable';
import { eventAnimationEnd, keyEscape, keyTab } from '@microsoft/fast-web-utilities';
import { colorNeutralStroke1, colorTransparentStroke } from '../theme/design-tokens.js';
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
  public type?: DrawerType = DrawerType.overlay;

  /**
   * Sets the position of the drawer (start/end).
   * @public
   * @remarks
   * HTML Attribute: position
   * @defaultValue end
   */
  @attr
  public position?: DrawerPosition = DrawerPosition.end;

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
    if (newValue !== oldValue) {
      if (newValue && !oldValue) {
        this.show();
      } else if (!newValue && oldValue) {
        this.close();
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
   * @public
   * Method called when the 'modalType' attribute changes
   */
  public modalTypeChanged(oldValue: DrawerModalType, newValue: DrawerModalType): void {
    if (newValue !== oldValue) {
      if (newValue == DrawerModalType.nonModal) {
        this.trapFocus = false;
      } else {
        this.trapFocus = true;
      }
    }
  }

  /**
   * Sets the component state based on the `open` property.
   * @public
   */
  public setComponent(): void {
    if (this.modalType == DrawerModalType.nonModal) {
      this.trapFocus = false;
    } else {
      this.trapFocus = true;
    }
    if (this.open) {
      this.show();
    }
  }

  /**
   * Opens the drawer if it is currently closed.
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
  public close(): void {
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
      this.close();
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
          this.close();
          this.cancel();
        }
        break;
      default:
        return true;
    }
  };

  /**
   * Indicates whether the drawer is currently trapping focus.
   * @internal
   */
  private isTrappingFocus: boolean = false;

  /**
   * @private
   * Indicates whether focus should be trapped within the dialog
   */
  private trapFocus: boolean = false;

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

  /**
   * @private
   * Handles keydown events on the document
   * @param e - The keydown event
   */
  private handleDocumentKeydown = (e: KeyboardEvent): void => {
    if (!e.defaultPrevented && this.dialog.open) {
      switch (e.key) {
        case keyTab:
          this.handleTabKeyDown(e);
          break;
      }
    }
  };

  /**
   * @private
   * Handles tab keydown events
   * @param e - The keydown event
   */
  private handleTabKeyDown = (e: KeyboardEvent): void => {
    if (!this.trapFocus || !this.dialog.open) {
      return;
    }

    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds();

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
   * @private
   * Gets the bounds of the tab queue
   * @returns (HTMLElement | SVGElement)[]
   */
  private getTabQueueBounds = (): (HTMLElement | SVGElement)[] => {
    const bounds: HTMLElement[] = [];

    return Drawer.reduceTabbableItems(bounds, this);
  };

  /**
   * @private
   * Focuses the first element in the tab queue
   */
  private focusFirstElement = (): void => {
    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds();

    if (bounds.length > 0) {
      bounds[0].focus();
    } else {
      if (this.dialog instanceof HTMLElement) {
        this.dialog.focus();
      }
    }
  };

  /**
   * @private
   * Determines if focus should be forced
   * @param currentFocusElement - The currently focused element
   * @returns boolean
   */
  private shouldForceFocus = (currentFocusElement: Element | null): boolean => {
    return this.isTrappingFocus && !this.contains(currentFocusElement);
  };

  /**
   * @private
   * Determines if focus should be trapped
   * @returns boolean
   */
  private shouldTrapFocus = (): boolean => {
    return this.trapFocus && this.dialog.open;
  };

  /**
   * @private
   * Handles focus events on the document
   * @param e - The focus event
   */
  private handleDocumentFocus = (e: Event): void => {
    if (!e.defaultPrevented && this.shouldForceFocus(e.target as HTMLElement)) {
      this.focusFirstElement();
      e.preventDefault();
    }
  };

  /**
   * @private
   * Updates the state of focus trapping
   * @param shouldTrapFocusOverride - Optional override for whether focus should be trapped
   */
  private updateTrapFocus = (shouldTrapFocusOverride?: boolean): void => {
    const shouldTrapFocus = shouldTrapFocusOverride === undefined ? this.shouldTrapFocus() : shouldTrapFocusOverride;

    if (shouldTrapFocus && !this.isTrappingFocus) {
      this.isTrappingFocus = true;
      // Add an event listener for focusin events if we are trapping focus
      document.addEventListener('focusin', this.handleDocumentFocus);
      Updates.enqueue(() => {
        if (this.shouldForceFocus(document.activeElement)) {
          this.focusFirstElement();
        }
      });
    } else if (!shouldTrapFocus && this.isTrappingFocus) {
      this.isTrappingFocus = false;
      // remove event listener if we are not trapping focus
      document.removeEventListener('focusin', this.handleDocumentFocus);
    }
  };

  /**
   * @private
   * Reduces the list of tabbable items
   * @param elements - The current list of elements
   * @param element - The element to consider adding to the list
   * @returns HTMLElement[]
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
   * @private
   * Determines if an element is a focusable FASTElement
   * @param element - The element to check
   * @returns boolean
   */
  private static isFocusableFastElement(element: FASTElement): boolean {
    return !!element.$fastController?.definition.shadowOptions?.delegatesFocus;
  }

  /**
   * @private
   * Determines if an element has a tabbable shadow
   * @param element - The element to check
   * @returns boolean
   */
  private static hasTabbableShadow(element: FASTElement) {
    return Array.from(element.shadowRoot?.querySelectorAll('*') ?? []).some(x => {
      return isTabbable(x);
    });
  }
}
