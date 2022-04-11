import { attr, observable } from '@microsoft/fast-element';
import { FormAssociatedCheckbox } from './checkbox.form-associated';

/**
 * Types of checkbox size.
 * @public
 */
export type CheckboxSize = 'medium' | 'large';

/**
 * @internal
 */
export class Checkbox extends FormAssociatedCheckbox {
  /**
   * The size the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public size: CheckboxSize = 'medium';

  /**
   * The label precedes the input
   *
   * @public
   * @remarks
   * HTML Attribute: label-before
   */
  @attr({ attribute: 'label-before', mode: 'boolean' })
  public labelBefore: boolean = false;

  /**
   * When true, the control will be immutable by user interaction.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: readonly
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly: boolean; // Map to proxy element
  private readOnlyChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.readOnly = this.readOnly;
    }
  }

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
  public defaultSlottedNodes: Node[];

  /**
   * The indeterminate state of the control
   */
  @observable
  public indeterminate: boolean = false;

  constructor() {
    super();

    this.proxy.setAttribute('type', 'checkbox');
  }

  /**
   * @internal
   */
  public keypressHandler = (e: KeyboardEvent): void => {
    switch (e.key) {
      case ' ':
        this.checked = !this.checked;
        break;
    }
  };

  /**
   * @internal
   */
  public clickHandler = (e: MouseEvent): void => {
    if (!this.disabled && !this.readOnly) {
      this.checked = !this.checked;
    }
  };
}
