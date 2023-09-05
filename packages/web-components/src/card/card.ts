import { attr, css, ElementStyles, observable } from '@microsoft/fast-element';
import { FASTCard, StartEndOptions } from '@microsoft/fast-foundation';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { CardAppearance, CardOrientation, CardSize } from './card.options.js';

/**
 * Card configuration options
 * @public
 */
export type CardOptions = StartEndOptions<Card>;

/**
 * @class Card component
 *
 * @remarks
 * This class extends the FASTCard. a flexible content container
 */
export class Card extends FASTCard {
  public connectedCallback(): void {
    super.connectedCallback();
    this.setInteractive();
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
  public sizeChanged(prev: boolean | undefined, next: boolean): void {
    this.updateComputedStylesheet();
  }

  /**
   * @method selectedChanged
   * @remarks
   * Emits an event when the selected state of the card changes
   */
  public selectedChanged = (): void => {
    this.$emit('onSelectionChanged', this.selected);
  };

  /**
   * @method interactiveChanged
   * @remarks
   * Updates the focusable state of the card when the interactive state changes
   */
  public interactiveChanged = (): void => {
    this.setInteractive();
  };

  /**
   * @method setFocusable
   * @remarks
   * Sets the tabindex attribute based on the interactive state of the card
   * @internal
   */
  public setInteractive(): void {
    if (this.interactive) {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
    } else {
      this.removeAttribute('tabindex');
      this.removeAttribute('aria-selected');
    }
  }

  /**
   * Updates an internal stylesheet with calculated CSS custom properties.
   *
   * @internal
   */
  protected updateComputedStylesheet(): void {
    // Determine the pixel value based on the size attribute
    let sizeValue;
    let borderRadiusValue;
    switch (this.size) {
      case CardSize.small:
        sizeValue = '8px';
        borderRadiusValue = '2px';
        break;
      case CardSize.medium:
        sizeValue = '12px';
        borderRadiusValue = '4px';
        break;
      case CardSize.large:
        sizeValue = '16px';
        borderRadiusValue = '8px';
        break;
      default:
        sizeValue = '12px';
        borderRadiusValue = '4px';
        break;
    }

    this.$fastController.removeStyles(this.computedStylesheet);

    this.computedStylesheet = css`
      :host {
        --card--size: ${sizeValue};
        --card--border-radius: ${borderRadiusValue};
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
    if (!this.disabled && this.interactive) {
      this.selected = !this.selected;
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
        if (!this.disabled && this.interactive) {
          this.selected = !this.selected;
        }
        break;
      }
      default:
        return true;
    }
  }
}
