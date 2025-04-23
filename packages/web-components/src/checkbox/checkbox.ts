import { attr, observable } from '@microsoft/fast-element';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { BaseCheckbox } from './checkbox.base.js';
import { CheckboxShape, CheckboxSize } from './checkbox.options.js';

/**
 * A Checkbox Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#checkbox | ARIA checkbox }.
 *
 * @tag fluent-checkbox
 *
 * @slot checked-indicator - The checked indicator
 * @slot indeterminate-indicator - The indeterminate indicator
 * @fires change - Emits a custom change event when the checked state changes
 * @fires input - Emits a custom input event when the checked state changes
 *
 * @public
 */
export class Checkbox extends BaseCheckbox {
  /**
   * Indicates that the element is in an indeterminate or mixed state.
   *
   * @public
   */
  @observable
  public indeterminate?: boolean;

  /**
   * Updates the indeterminate state when the `indeterminate` property changes.
   *
   * @param prev - the indeterminate state
   * @param next - the current indeterminate state
   * @internal
   */
  protected indeterminateChanged(prev: boolean | undefined, next: boolean | undefined): void {
    this.setAriaChecked();
    toggleState(this.elementInternals, 'indeterminate', next);
  }

  /**
   * Indicates the shape of the checkbox.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: CheckboxShape;

  /**
   * Indicates the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: CheckboxSize;

  constructor() {
    super();
    this.elementInternals.role = 'checkbox';
  }

  /**
   * Sets the ARIA checked state. If the `indeterminate` flag is true, the value will be 'mixed'.
   *
   * @internal
   * @override
   */
  protected setAriaChecked(value: boolean = this.checked) {
    if (this.indeterminate) {
      this.elementInternals.ariaChecked = 'mixed';
      return;
    }

    super.setAriaChecked(value);
  }

  /**
   * Toggles the checked state of the control.
   *
   * @param force - Forces the element to be checked or unchecked
   * @public
   */
  public toggleChecked(force: boolean = !this.checked): void {
    this.indeterminate = false;
    super.toggleChecked(force);
  }
}
