import { attr, css, ElementStyles, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { FASTCard } from '@microsoft/fast-foundation';
import { isTabbable } from 'tabbable';
import { keyEnter, keyEscape, keySpace, keyTab } from '@microsoft/fast-web-utilities';
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
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  @observable
  @attr({ attribute: 'focus-mode' })
  public focusMode: CardFocusMode = CardFocusMode.off;

  /**
   * Stores the computed stylesheet for the card
   */
  private computedStylesheet?: ElementStyles;

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
  public card!: HTMLElement;

  /**
   * @remarks
   * Reference to the root element
   */
  public root!: HTMLElement;

  /**
   * @remarks
   * Reference to the floatingAction slot
   */
  @observable
  public floatingAction: HTMLElement[] = [];

  /**
   * @remarks
   * Reference to the root element
   */
  public control!: HTMLElement;

  /**
   * Toggles the selection state of the card.
   *
   * @param checked - Optional boolean value to set the selection state.
   */
  public toggleCardSelection(selected?: boolean): void {
    if (this.selectable) {
      if (selected) {
        this.selected = true;
      } else if (selected === false) {
        this.selected = false;
      } else {
        this.selected = !this.selected;
      }
      const checkbox = this.floatingAction[0] as HTMLInputElement;
      if (checkbox && checkbox.checked !== this.selected) {
        checkbox.checked = this.selected;
      }
    }
  }

  /**
   * Selects the card if it is not already selected and is selectable.
   */
  public select() {
    if (!this.selected && this.selectable) {
      this.selected = true;
    }
  }

  /**
   * Unselects the card if it is not already unselected and selectable.
   */
  public unselect() {
    if (!this.selected && this.selectable) {
      this.selected = true;
    }
  }

  /**
   * Focuses on the element at the specified index in the bounds array.
   * If the bounds array is empty, it focuses on the card itself.
   *
   * @param index - The index of the element to focus on.
   */
  private focusElementAtIndex = (index: number): void => {
    if (this.bounds.length > 0) {
      this.bounds[index].focus();
    } else {
      this.card.focus();
    }
  };

  /**
   * Focuses on the first element in the bounds array.
   * If the bounds array is empty, it focuses on the card itself.
   */
  public focusFirstElement = (): void => {
    this.focusElementAtIndex(0);
  };

  /**
   * Focuses on the last element in the bounds array.
   * If the bounds array is empty, it focuses on the card itself.
   */
  public focusLastElement = (): void => {
    this.focusElementAtIndex(this.bounds.length - 1);
  };

  public floatingActionChangeHandler(e: Event): boolean | void {
    if (this.disabled || e.defaultPrevented || !this.selectable) {
      return;
    }
    const checkbox = this.floatingAction[0] as HTMLInputElement;
    this.toggleCardSelection(checkbox.checked);
    e.preventDefault();
  }

  /**
   * Handles click events on the card.
   *
   * @param e - The mouse event.
   * @returns {boolean | void} - Returns true if the card is not selectable, otherwise void.
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (this.disabled || e.defaultPrevented || !this.selectable) {
      return;
    }
    this.toggleCardSelection();
    e.preventDefault();
  }

  /**
   * Handles keydown events on the card.
   *
   * @param e - The keyboard event.
   * @returns {boolean | void} - Returns true if the card is disabled, otherwise void.
   */
  public keydownHandler(e: KeyboardEvent): boolean | void | null {
    if (this.disabled || e.defaultPrevented) {
      return true;
    }

    const { key, target, currentTarget, shiftKey } = e;
    const isTargetCurrent = target === currentTarget;
    const isFocusModeOffOrTabOnly = this.focusMode === CardFocusMode.off || this.focusMode === CardFocusMode.tabOnly;
    const isFocusModeOff = this.focusMode === CardFocusMode.off;
    const isLastIndexFocused = this.isBoundsLastIndexFocused;
    const isZeroIndexFocused = this.isBoundsZeroIndexFocused;

    switch (key) {
      case keyEnter:
      case keySpace:
        if (!isTargetCurrent) {
          return true;
        }
        if (this.selectable) {
          this.toggleCardSelection();
        } else if (!isFocusModeOff) {
          Updates.enqueue(() => {
            this.root.inert = false;
            this.focusFirstElement();
          });
        }
        e.preventDefault();
        break;

      case keyTab:
        if (this.shouldTrapFocus) {
          if ((isLastIndexFocused && !shiftKey) || (isZeroIndexFocused && shiftKey)) {
            e.preventDefault();
            isLastIndexFocused ? this.focusFirstElement() : this.focusLastElement();
          }
          return true;
        } else if (this.focusMode === CardFocusMode.tabExit) {
          if (
            (isLastIndexFocused && !shiftKey) ||
            (isZeroIndexFocused && shiftKey) ||
            document.activeElement === this.card
          ) {
            this.root.inert = !this.root.inert;
          }
          return true;
        }
        return true;

      case keyEscape:
        if (this.focusMode !== CardFocusMode.off) {
          this.card.focus();
        }
        if (!isFocusModeOffOrTabOnly) {
          this.root.inert = true;
        }
        e.preventDefault();

      default:
        return true;
    }
  }

  /**
   * Determines if the card is focusable.
   * @returns {boolean} - True if the card is focusable, false otherwise.
   */
  get isFocusable(): boolean {
    return !this.disabled && this.focusMode !== 'off';
  }

  /**
   * Returns the bounds of the tab queue.
   * The tab queue is a collection of elements that are focusable.
   *
   * @returns {(HTMLElement | SVGElement)[]} - The bounds of the tab queue.
   */
  get bounds(): (HTMLElement | SVGElement)[] {
    return this.getTabQueueBounds(this);
  }

  /**
   * Checks if the first element in the tab queue is focused.
   *
   * @returns {boolean} - True if the first element in the tab queue is focused, false otherwise.
   */
  get isBoundsZeroIndexFocused(): boolean {
    return document.activeElement === this.bounds[0];
  }

  /**
   * Checks if the last element in the tab queue is focused.
   *
   * @returns {boolean} - True if the last element in the tab queue is focused, false otherwise.
   */
  get isBoundsLastIndexFocused(): boolean {
    return document.activeElement === this.bounds[this.bounds.length - 1];
  }

  /**
   * Determines if focus should be trapped within the card.
   *
   * @internal
   */
  get shouldTrapFocus(): boolean {
    return this.focusMode === CardFocusMode.noTab;
  }

  /**
   * @method sizeChanged
   * @remarks
   * Updates the computed stylesheet when the size of the card changes
   */
  protected sizeChanged(): void {
    this.updateComputedStylesheet();
  }

  /**
   * @method selectedChanged
   * @remarks
   * Emits an event when the selected state of the card changes
   */
  protected selectedChanged = (): void => {
    this.$emit('onSelectionChanged', this.selected);
  };

  /**
   * Sets the component's properties based on the focus mode.
   * If the focus mode is 'no-tab' or 'tab-exit', the root element's inert property is set to true.
   * @private
   */
  private setComponent(): void {
    if ((this.focusMode !== CardFocusMode.off && this.focusMode !== CardFocusMode.tabOnly) || this.disabled) {
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
