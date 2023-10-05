import { attr, css, ElementStyles, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { FASTCard } from '@microsoft/fast-foundation';
import { isTabbable } from 'tabbable';
import { keyEnter, keyEscape, keySpace } from '@microsoft/fast-web-utilities';
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
    this.setComponent();
    this.updateComputedStylesheet();
    Updates.enqueue(() => {
      this.updateTrapFocus();
    });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.updateTrapFocus(false);
  }

  @attr({ attribute: 'focus-mode' })
  public focusMode: CardFocusMode = CardFocusMode.off;

  /**
   * Indicates whether the card is currently trapping focus.
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
  @observable
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
   * @property selected
   * @default false
   * @remarks
   * Determines selected state of card
   */
  @observable
  @attr({ mode: 'boolean' })
  public selected: boolean = false;

  /**
   * The id of the element describing the dialog.
   * @public
   * @remarks
   * HTML Attribute: aria-describedby
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * The id of the element labeling the dialog.
   * @public
   * @remarks
   * HTML Attribute: aria-labelledby
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * @remarks
   * Reference to the card element
   */
  @observable
  public card!: HTMLElement;

  /**
   * @remarks
   * Reference to the root element
   */
  @observable
  public root!: HTMLElement;

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
  }

  /**
   * @method sizeChanged
   * @remarks
   * Updates the computed stylesheet when the size of the card changes
   */
  protected sizeChanged(prev: string, next: string): void {
    this.updateComputedStylesheet();
  }

  /**
   * @method selectedChanged
   * @remarks
   * Emits an event when the selected state of the card changes
   */
  protected selectedChanged = (prev: boolean, next: boolean): void => {
    this.$emit('onSelectionChanged', this.selected);
  };

  /**
   * Sets the component's properties based on the focus mode.
   * If the focus mode is 'no-tab' or 'tab-exit', the root element's inert property is set to true.
   * @private
   */
  private setComponent(): void {
    if (this.focusMode === CardFocusMode.noTab || this.focusMode === CardFocusMode.tabExit || this.disabled) {
      this.root.inert = true;
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
      case keySpace: {
        if (e.target !== e.currentTarget) {
          return true;
        }
        if (e.target === e.currentTarget && this.interactive && this.selectable) {
          e.preventDefault();
          this.toggleCardSelection();
        } else if (
          e.target === e.currentTarget &&
          (this.focusMode === CardFocusMode.noTab || this.focusMode === CardFocusMode.tabExit)
        ) {
          e.preventDefault();
          Updates.enqueue(() => {
            this.root.inert = false;
            this.focusFirstElement();
          });
        }
        return true;
      }
      case keyEscape:
        if (this.focusMode === CardFocusMode.noTab) {
          this.card.focus();
          this.root.inert = true;
          e.preventDefault();
        }
        break;
      default:
        return true;
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
   * Handles focusing out of the card.
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
  private getTabQueueBounds = (context: FASTElement): (HTMLElement | SVGElement)[] => {
    const bounds: HTMLElement[] = [];
    return Card.reduceTabbableItems(bounds, context);
  };

  /**
   * Focuses on the first element in the tab queue if it is tabbable.
   * If the tab queue is empty or the first element is not tabbable, it focuses on the card if it is an instance of HTMLDivElement.
   * @internal
   */
  private focusFirstElement = (): void => {
    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds(this);
    if (bounds.length > 0) {
      bounds[0].focus();
    } else if (this.card instanceof HTMLElement) {
      this.card!.focus();
    }
  };

  /**
   * Determines if focus should be forced on the current focus element.
   * Focus is forced if the card is trapping focus, the current focus element is not contained within the card, and the current focus element is not the first element in the tab queue.
   *
   * @param currentFocusElement - The current focus element.
   * @internal
   */
  private shouldForceFocus = (currentFocusElement: Element | null): boolean => {
    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds(this);
    return (
      this.isTrappingFocus &&
      this.contains(currentFocusElement) &&
      currentFocusElement === bounds[bounds.length - 1] &&
      currentFocusElement !== bounds[0]
    );
  };

  /**
   * Getter for the tabIndex property.
   * @returns {number} - The tabIndex value.
   */
  get tabIndex(): number {
    if (this.disabled || (this.focusMode === 'off' && !this.interactive)) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Determines if focus should be trapped within the card.
   *
   * @internal
   */
  private shouldTrapFocus = (): boolean => {
    return this.focusMode === 'no-tab';
  };

  /**
   * Updates the focus trap based on the current state of the card.
   * If the card is open and focus trapping is enabled, it adds event listeners for focusin events and animationend events.
   * If the card is closed or focus trapping is disabled, it removes these event listeners.
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
