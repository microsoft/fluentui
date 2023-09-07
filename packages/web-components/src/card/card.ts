import { attr, css, ElementStyles, observable } from '@microsoft/fast-element';
import { FASTCard } from '@microsoft/fast-foundation';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { Checkbox as FluentCheckbox } from '../checkbox/index.js';
import { CardAppearance, CardOrientation, CardSize } from './card.options.js';

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
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

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
   * @property labelledby;
   * @default undefined
   * @remarks
   * This property is used to specify the ID of another element in the same document that labels the card.
   */
  @attr
  public labelledby?: string;

  /**
   * @property label;
   * @default undefined
   * @remarks
   * A string that corresponds to the ID of another element in the DOM that serves as the label for the internal checkbox element.
   */
  @attr
  public label?: string;

  /**
   * @property orientation;
   * @default filled
   * @remarks
   * Determines the orientation of the card
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
   * @property selected
   * @default false
   * @remarks
   * Determines selected state of card
   */
  @observable
  @attr({ mode: 'boolean' })
  public selected: boolean = false;

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
   * If a boolean value is provided, it sets the selection state to that value.
   * Otherwise, it inverts the current selection state.
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
   * If the internal checkbox is not present, it sets the 'checked' attribute of the first element in the floating action slot.
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
   * Handle the checked state of the Card when interactive
   *
   * @param e - the mouse event
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (!this.disabled && this.interactive && this.selectable) {
      this.toggleCardSelection();
    }
  }

  /**
   * Handle keyboard interaction for the select.
   *
   * @param e - the keyboard event
   * @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    const key = e.key || e.key.charCodeAt(0);

    switch (key) {
      case keyEnter:
      case keySpace: {
        e.preventDefault();
        if (!this.disabled && this.interactive && this.selectable) {
          this.toggleCardSelection();
        }
        break;
      }
      default:
        return true;
    }
  }
}
