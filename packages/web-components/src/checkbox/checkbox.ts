import { attr, observable } from '@microsoft/fast-element';
import { keySpace } from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import { FormAssociatedCheckbox } from './checkbox.form-associated.js';
import { CheckboxLabelPosition, CheckboxShape, CheckboxSize } from './checkbox.options.js';

/**
 * Checkbox configuration options
 * @public
 */
export type CheckboxOptions = {
  checkedIndicator?: StaticallyComposableHTML<Checkbox>;
  indeterminateIndicator?: StaticallyComposableHTML<Checkbox>;
};

/**
 * A Checkbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#checkbox | ARIA checkbox }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot indeterminate-indicator - The indeterminate indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual checkbox control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export class Checkbox extends FormAssociatedCheckbox {
  /**
   * Sets shape of the checkbox.
   *
   * @public
   * @default 'square'
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: CheckboxShape;

  /**
   * Sets size of the checkbox.
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: CheckboxSize;

  /**
   * Sets position of the label relative to the input
   *
   * @public
   * @default 'after'
   * @remarks
   * HTML Attribute: label-position
   */
  @attr({ attribute: 'label-position' })
  public labelPosition?: CheckboxLabelPosition;
  /**
   * The element's value to be included in form submission when checked.
   * Default to "on" to reach parity with input[type="checkbox"]
   *
   * @internal
   */
  public initialValue: string = 'on';

  /**
   * @internal
   */
  @observable
  public defaultSlottedNodes!: Node[];

  /**
   * The indeterminate state of the control
   */
  @observable
  public indeterminate: boolean = false;

  constructor() {
    super();

    this.proxy.setAttribute('type', 'checkbox');
  }

  private toggleChecked() {
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    this.checked = !this.checked;
  }

  /**
   * @internal
   */
  public keypressHandler = (e: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    switch (e.key) {
      case keySpace:
        this.toggleChecked();
        break;
    }
  };

  /**
   * @internal
   */
  public clickHandler = (e: MouseEvent): void => {
    if (!this.disabled) {
      this.toggleChecked();
    }
  };
}
