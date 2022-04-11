import { attr, observable } from '@microsoft/fast-element';
import { FormAssociatedRadio } from './radio.form-associated';

/**
 * A structure representing a {@link @microsoft/fast-foundation#(Radio:class)} element
 * @public
 */
export type RadioControl = Pick<
  HTMLInputElement,
  'checked' | 'disabled' | 'readOnly' | 'focus' | 'setAttribute' | 'getAttribute'
>;

/**
 * A Radio Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radio | ARIA radio }.
 *
 * @internal
 */
export class Radio extends FormAssociatedRadio implements RadioControl {
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
   * The name of the radio.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname | name attribute} for more info.
   */
  @observable
  public name: string;

  /**
   * The element's value to be included in form submission when checked.
   * Default to "on" to reach parity with input[type="radio"]
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
   * @internal
   */
  public defaultCheckedChanged(): void {
    if (this.$fastController.isConnected && !this.dirtyChecked) {
      // Setting this.checked will cause us to enter a dirty state,
      // but if we are clean when defaultChecked is changed, we want to stay
      // in a clean state, so reset this.dirtyChecked
      if (!this.isInsideRadioGroup()) {
        this.checked = this.defaultChecked ?? false;
        this.dirtyChecked = false;
      }
    }
  }

  constructor() {
    super();
    this.proxy.setAttribute('type', 'radio');
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();
    this.validate();

    if (this.parentElement?.getAttribute('role') !== 'radiogroup' && this.getAttribute('tabindex') === null) {
      if (!this.disabled) {
        this.setAttribute('tabindex', '0');
      }
    }

    if (this.checkedAttribute) {
      if (!this.dirtyChecked) {
        // Setting this.checked will cause us to enter a dirty state,
        // but if we are clean when defaultChecked is changed, we want to stay
        // in a clean state, so reset this.dirtyChecked
        if (!this.isInsideRadioGroup()) {
          this.checked = this.defaultChecked ?? false;
          this.dirtyChecked = false;
        }
      }
    }
  }

  private isInsideRadioGroup(): boolean {
    const parent: HTMLElement | null = (this as HTMLElement).closest('[role=radiogroup]');
    return parent !== null;
  }

  /**
   * @internal
   */
  public keypressHandler = (e: KeyboardEvent): boolean | void => {
    switch (e.key) {
      case ' ':
        if (!this.checked && !this.readOnly) {
          this.checked = true;
        }
        return;
    }

    return true;
  };

  /**
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (!this.disabled && !this.readOnly && !this.checked) {
      this.checked = true;
    }
  }
}
