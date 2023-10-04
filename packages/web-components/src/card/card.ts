import { attr, css, ElementStyles, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { FASTCard } from '@microsoft/fast-foundation';
import { isTabbable } from 'tabbable';
import { keyEnter, keySpace, keyTab } from '@microsoft/fast-web-utilities';
import { Checkbox as FluentCheckbox } from '../checkbox/index.js';
import { CardAppearance, CardFocusMode, CardOrientation, CardSize } from './card.options.js';

/**
 * @class Card component
 *
 * @remarks
 * This class extends the FASTCard. a flexible content container
 */
export class Card extends FASTCard {
  public connectedCallback(): void {
    super.connectedCallback();
    this.updateComputedStylesheet();
    document.addEventListener('keydown', this.handleDocumentKeydown);

    Updates.enqueue(() => {
      this.updateTrapFocus();
    });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    document.addEventListener('keydown', this.handleDocumentKeydown);

    this.updateTrapFocus(false);
  }

  @attr({ attribute: 'trap-focus', mode: 'boolean' })
  public trapFocus: boolean = false;

  /**
   * Indicates whether the drawer is currently trapping focus.
   * @internal
   */
  private isTrappingFocus: boolean = false;

  /**
   * Stores the computed stylesheet for the card
   */
  private computedStylesheet?: ElementStyles;

  /**
   * A reference to the floating action slot
   */
  @observable
  public floatingActionSlot: HTMLElement[] = [];

  /**
   * A reference to the internal checkbox
   */
  @observable
  public internalCheckbox?: FluentCheckbox;

  /**
   * See {@link https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-labelledby
   */
  @attr
  public ariaLabelledby?: string;

  /**
   * @property appearance;
   * @default filled
   * @remarks
   * Determines the appearance of the card
   */
  @attr
  public appearance?: CardAppearance;

  /**
   * @property orientation;
   * @default vertical
   * @remarks
   * Determines the orientation of the card
   */
  @attr
  public orientation?: CardOrientation;

  /**
   * @property size
   * @default medium
   * @remarks
   * Determines the size of the card
   */
  @attr({ attribute: 'size' })
  public size?: CardSize;

  /**
   * @property interactive
   * @default false
   * @remarks
   * Determines whether card is interactable
   */
  @observable
  @attr({ mode: 'boolean' })
  public interactive: boolean = false;

  /**
   * @property selectable
   * @default false
   * @remarks
   * Determines whether card is selectable
   */
  @observable
  @attr({ mode: 'boolean' })
  public selectable: boolean = false;

  /**
   * @property disabled
   * @default false
   * @remarks
   * Determines disabled state of card
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * @property inert
   * @default false
   * @remarks
   * Determines whether card focus is inert
   */
  @attr({ mode: 'boolean' })
  public inert: boolean = false;

  /**
   * @property selected
   * @default false
   * @remarks
   * Determines selected state of card
   */
  @observable
  @attr({ mode: 'boolean' })
  public selected: boolean = false;

  /**
   * @remarks
   * Reference to the card element
   */
  @observable
  public card!: HTMLElement;

  /**
   * @method sizeChanged
   * @remarks
   * Updates the computed stylesheet when the size of the card changes
   */
  public sizeChanged(prev: string, next: string): void {
    this.updateComputedStylesheet();
  }

  /**
   * @method selectedChanged
   * @remarks
   * Emits an event when the selected state of the card changes
   */
  public selectedChanged = (prev: boolean, next: boolean): void => {
    this.$emit('onSelectionChanged', this.selected);
  };

  /**
   * Toggles the selection state of the card.
   *
   * @param checked - Optional boolean value to set the selection state.
   */
  public toggleCardSelection(checked?: boolean): void {
    if (checked) {
      this.selected = checked;
    } else {
      this.selected = !this.selected;
    }
    this.updateInternalCheckboxState();
  }

  /**
   * Updates the state of the internal checkbox to match the selection state of the card.
   */
  public updateInternalCheckboxState(): void {
    if (this.internalCheckbox && !this.floatingActionSlot.length && this.selectable) {
      this.internalCheckbox.checked = this.selected;
    }
  }

  /**
   * Updates an internal stylesheet with calculated CSS custom properties.
   *
   * @internal
   */
  protected updateComputedStylesheet(): void {
    let sizeValue;
    switch (this.size) {
      case CardSize.small:
        sizeValue = '8px';
        break;
      case CardSize.medium:
        sizeValue = '12px';
        break;
      case CardSize.large:
        sizeValue = '16px';
        break;
      default:
        sizeValue = '12px';
        break;
    }

    this.computedStylesheet = css`
      :host {
        --card-size: ${sizeValue};
      }
    `;
    this.$fastController.addStyles(this.computedStylesheet);
  }

  /**
   * Handle the checked state of the Card when interactive and selectable
   *
   * @param e - the mouse event
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (this.disabled) {
      return;
    }
    if (!this.disabled && this.interactive && this.selectable) {
      this.toggleCardSelection();
    }
  }

  /**
   * Handle keyboard interaction for the card.
   *
   * @param e - the keyboard event
   * @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    if (this.disabled) {
      return;
    }
    const key = e.key;
    switch (key) {
      case keyEnter:
      case keySpace:
        {
          if (e.target === e.currentTarget && this.interactive && this.selectable) {
            this.toggleCardSelection();
            e.preventDefault();
          } else {
            Updates.enqueue(() => {
              if (this.trapFocus) {
                this.focusFirstElement();
              }
            });
          }
        }
        break;
      default:
        return true;
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
    if (!e.defaultPrevented) {
      switch (e.key) {
        case keyTab:
          this.handleTabKeyDown(e);
          break;
      }
    }
  };

  /**
   * Handles the Tab key down event.
   * If the drawer is not open or focus trapping is disabled, it does nothing.
   * Otherwise, it gets the bounds of the tab queue and focuses on the appropriate element based on the current focus and whether the Shift key is pressed.
   *
   * @param {KeyboardEvent} e - The keyboard event.
   * @private
   */
  private handleTabKeyDown = (e: KeyboardEvent): void => {
    if (!this.trapFocus) {
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
  private handleCardFocusOut = (e: Event): void => {
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
    return Card.reduceTabbableItems(bounds, this);
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
    } else if (this.card instanceof HTMLElement) {
      this.card!.focus();
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
    return this.trapFocus;
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
      this.card.addEventListener('focusout', this.handleCardFocusOut);
    } else if (!shouldTrapFocus && this.isTrappingFocus) {
      this.isTrappingFocus = false;
      this.card.removeEventListener('focusout', this.handleCardFocusOut);
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

    if (isTabbable(element) || (Card.isFocusableFastElement(element) && Card.hasTabbableShadow(element))) {
      elements.push(element);
      return elements;
    }

    return Array.from(element.children).reduce<HTMLElement[]>(
      (elements, currentElement) => Card.reduceTabbableItems(elements, currentElement as FASTElement),
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
