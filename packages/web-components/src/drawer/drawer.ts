import { attr, css, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { keyEscape, keyTab } from '@microsoft/fast-web-utilities';
import { isTabbable } from 'tabbable';
import { colorNeutralStroke1, colorTransparentStroke } from '../theme/design-tokens.js';
import { DrawerPosition, DrawerSize } from './drawer.options.js';

export interface OpenEvent {
  open: boolean;
  position?: string;
  size?: DrawerSize | number;
}

export class Drawer extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleDocumentKeydown);
    this.updateTrapFocus();
    this.setOverflowStyles();
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
   * The drawer element.
   * @public
   * @remarks
   * HTML Attribute: drawer
   */
  @observable
  public drawer?: HTMLDivElement;

  /**
   * Indicates whether the drawer is open or closed.
   * @public
   * @remarks
   * HTML Attribute: open
   */
  @observable
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  /**
   * Determines whether the drawer should be displayed as modal or non-modal.
   * When in modal mode, an overlay is applied over the rest of the view.
   * @public
   * @remarks
   * HTML Attribute: modal
   */
  @attr({ mode: 'boolean' })
  public modal: boolean = false;

  /**
   * Sets the position of the drawer (left/right).
   * @public
   * @remarks
   * HTML Attribute: position
   * @defaultValue right
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
   * Sets the aria-labelledby attribute of the drawer.
   * @public
   * @remarks
   * HTML Attribute: aria-labelledby
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * Sets the aria-describedby attribute of the drawer.
   * @public
   * @remarks
   * HTML Attribute: aria-describedby
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * Indicates that the drawer should not trap focus.
   *
   * @public
   * @defaultValue - true
   * @remarks
   * HTML Attribute: no-focus-trap
   */
  @attr({ attribute: 'no-focus-trap', mode: 'boolean' })
  public noFocusTrap: boolean = false;

  /**
   * Indicates whether the drawer is currently trapping focus.
   * @internal
   */
  private isTrappingFocus: boolean = false;

  /**
   * Shows the drawer.
   * @public
   */
  public show(): void {
    this.open = true;
  }

  /**
   * Hides the drawer.
   * @public
   */
  public hide(): void {
    this.open = false;
  }

  /**
   * Toggles the state of the drawer (open/closed).
   * @public
   */
  public toggleDrawer(): void {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Returns the size of the drawer based on its current size property.
   *
   * @returns {number} - The size of the drawer. It returns specific pixel values for 'small', 'medium', and 'large' sizes. For other sizes, it returns the computed width of the drawer.
   */
  get sizeValue(): number {
    switch (this.size) {
      case 'small':
        return 320;
      case 'medium':
        return 592;
      case 'large':
        return 940;
      default:
        return parseFloat(window.getComputedStyle(this).width);
    }
  }

  /**
   * Handles changes to the `open` property.
   * @param prev - The previous value of `open`.
   * @param next - The new value of `open`.
   * @remarks
   * This method is invoked when the `open` property changes and is responsible for emitting the `openChanged` event.
   * @internal
   */
  protected openChanged(prev: boolean, next: boolean): void {
    if (this.$fastController.isConnected) {
      const eventDetail: OpenEvent = {
        open: this.open,
        position: this.position ? this.position : 'right',
        size: this.sizeValue,
      };
      const event = new CustomEvent<OpenEvent>('openChanged', {
        detail: eventDetail,
      });
      this.open ? this.updateTrapFocus() : this.updateTrapFocus(false);
      this.dispatchEvent(event);
    }
  }

  /**
   * Handles changes to the `noFocusTrap` property.
   * If the component is connected, it updates the focus trap.
   * @internal
   */
  protected noFocusTrapChanged = (): void => {
    if (this.$fastController.isConnected) {
      this.updateTrapFocus();
    }
  };

  /**
   * Sets the overflow styles
   * @internal
   */
  private setOverflowStyles(): void {
    Updates.enqueue(() => {
      if (this.content && this.content.scrollHeight > this.content.clientHeight) {
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
    });
  }

  /**
   * Handles the focus event on the document.
   * If the event is not prevented and the focus should be forced on the target element,
   * it focuses on the first element and prevents the default behavior.
   *
   * @param e - The Event object.
   * @internal
   */
  private handleDocumentFocus = (e: Event): void => {
    if (!e.defaultPrevented && this.shouldForceFocus(e.target as HTMLElement)) {
      this.focusFirstElement();
      e.preventDefault();
    }
  };

  /**
   * Handles the tab key down event.
   * If the drawer is open and focus trapping is not disabled, it focuses on the first or last element in the tab queue depending on whether the shift key is pressed.
   * If the tab queue only contains one element, it keeps the focus on that element.
   *
   * @param e - The KeyboardEvent object.
   * @internal
   */
  private handleTabKeyDown = (e: KeyboardEvent): void => {
    if (this.noFocusTrap || !this.open) {
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
   * Returns the bounds of the tab queue.
   * The tab queue is a collection of elements that are focusable.
   *
   * @returns {(HTMLElement | SVGElement)[]} - The bounds of the tab queue.
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
    if (bounds.length > 0 && isTabbable(bounds[0])) {
      bounds[0].focus();
    } else {
      if (this.drawer instanceof HTMLDivElement) {
        this.drawer!.focus();
      }
    }
  };

  /**
   * Determines if focus should be forced on the current focus element.
   * Focus is forced if the drawer is trapping focus, the current focus element is not contained within the drawer, and the current focus element is not the first element in the tab queue.
   *
   * @param currentFocusElement - The current focus element.
   * @returns {boolean} - True if focus should be forced, false otherwise.
   * @internal
   */
  private shouldForceFocus = (currentFocusElement: Element | null): boolean => {
    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds();
    return this.isTrappingFocus && !this.contains(currentFocusElement) && currentFocusElement !== bounds[0];
  };

  /**
   * Determines if focus should be trapped within the drawer.
   * Focus is trapped if the drawer is open and focus trapping is not disabled.
   *
   * @returns {boolean} - True if focus should be trapped, false otherwise.
   * @internal
   */
  private shouldTrapFocus = (): boolean => {
    return !this.noFocusTrap && this.open;
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
      // Add an event listener for focusin events if we are trapping focus
      document.addEventListener('focusin', this.handleDocumentFocus);
      this.drawer!.addEventListener('animationend', this.focusFirstElement);

      Updates.enqueue(() => {
        if (this.shouldForceFocus(document.activeElement)) {
          this.focusFirstElement();
        }
      });
    } else if (!shouldTrapFocus && this.isTrappingFocus) {
      this.isTrappingFocus = false;
      // remove event listener if we are not trapping focus
      document.removeEventListener('focusin', this.handleDocumentFocus);
      this.drawer!.removeEventListener('animationend', this.focusFirstElement);
    }
  };

  /**
   * Reduce a collection to only its focusable elements.
   *
   * @param elements - Collection of elements to reduce
   * @param element - The current element
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
   * @param element - The element to check
   *
   * @internal
   */
  private static isFocusableFastElement(element: FASTElement): boolean {
    return !!element.$fastController?.definition.shadowOptions?.delegatesFocus;
  }

  /**
   * Test if the element has a focusable shadow
   *
   * @param element - The element to check
   *
   * @internal
   */
  private static hasTabbableShadow(element: FASTElement) {
    return Array.from(element.shadowRoot?.querySelectorAll('*') ?? []).some(x => {
      return isTabbable(x);
    });
  }

  /**
   * Handles the keydown event on the document.
   * If the drawer is open and the key pressed is either the escape key or the tab key,
   * it performs the corresponding action and prevents the default behavior.
   *
   * @param e - The KeyboardEvent object.
   * @internal
   */
  public handleDocumentKeydown = (e: KeyboardEvent): void => {
    if (!e.defaultPrevented && this.open) {
      switch (e.key) {
        case keyEscape:
          // If the escape key is pressed, hide the drawer and prevent the default behavior.
          this.hide();
          e.preventDefault();
          break;

        case keyTab:
          // If the tab key is pressed, handle the tab key down event.
          this.handleTabKeyDown(e);
          break;
      }
    }
  };

  /**
   * Handles the keydown event on the document.
   * @param e - The KeyboardEvent object.
   * @internal
   */
  public handleKeyDown(e: KeyboardEvent): boolean | void {
    if (e.defaultPrevented) {
      return;
    }
    const key = e.key;
    switch (key) {
      case keyEscape:
        e.preventDefault();
        this.blur();
        this.hide();
      default:
        return true;
    }
  }
}
