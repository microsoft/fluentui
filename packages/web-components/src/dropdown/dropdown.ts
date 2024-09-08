import { attr, Observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { AbstractCombobox } from '../patterns/abstract-combobox.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';

/**
 * Base class for a Dropdown custom element.
 *
 * @slot trigger-indicator
 *
 * @public
 */
export class BaseDropdown extends AbstractCombobox {}

/**
 * A Dropdown custom element.
 *
 * @public
 */
export class Dropdown extends BaseDropdown {
  /**
   * Indicates the visual appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr({ mode: 'fromView' })
  public appearance: DropdownAppearance = DropdownAppearance.outline;
  protected appearanceChanged(prev: DropdownAppearance | undefined, next: DropdownAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }

    if (!next || !Array.from(Object.values(DropdownAppearance)).includes(next)) {
      toggleState(this.elementInternals, DropdownAppearance.outline, true);
    } else {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * Sets the element's block state.
   *
   * @public
   * @remarks
   * HTML Attribute: `block`
   */
  @attr({ mode: 'boolean' })
  public block = false;
  protected blockChanged() {
    toggleState(this.elementInternals, 'block', this.block);
  }

  /**
   * Indicates whether the element displays a box shadow. This only has effect
   * when `appearance` is set to be `filled-darker` or `filled-lighter`.
   *
   * @public
   * @remarks
   * HTML Attribute: `display-shadow`
   */
  @attr({ attribute: 'display-shadow', mode: 'boolean' })
  public displayShadow = false;

  /**
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr({ mode: 'fromView' })
  public size: DropdownSize = DropdownSize.medium;
  protected sizeChanged(prev: DropdownSize | undefined, next: DropdownSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }

    if (!next || !Array.from(Object.values(DropdownSize)).includes(next)) {
      toggleState(this.elementInternals, DropdownSize.medium, true);
    } else {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * @internal
   */
  public handleChange(_: unknown, propertyName: string) {
    switch (propertyName) {
      case 'appearance':
      case 'displayShadow':
        this.maybeDisplayShadow();
        break;
    }
  }

  /**
   * @internal
   */
  public connectedCallback() {
    super.connectedCallback();

    this.maybeDisplayShadow();

    Observable.getNotifier(this).subscribe(this, 'appearance');
    Observable.getNotifier(this).subscribe(this, 'displayShadow');
  }

  /**
   * @internal
   */
  public disconnectedCallback() {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this, 'appearance');
    Observable.getNotifier(this).unsubscribe(this, 'displayShadow');
  }

  private maybeDisplayShadow() {
    const canDisplayShadow =
      this.appearance === DropdownAppearance.filledDarker || this.appearance === DropdownAppearance.filledLighter;

    toggleState(this.elementInternals, 'display-shadow', this.displayShadow && canDisplayShadow);
  }
}
