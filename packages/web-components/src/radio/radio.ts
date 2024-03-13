import { observable } from '@microsoft/fast-element';
import { keySpace } from '@microsoft/fast-web-utilities';
import type { RadioGroup } from '../radio-group/index.js';
import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import { FormAssociatedRadio } from './radio.form-associated.js';

/**
 * @public
 */
export type RadioControl = Pick<HTMLInputElement, 'checked' | 'disabled' | 'focus' | 'setAttribute' | 'getAttribute'>;

/**
 * Radio configuration options
 * @public
 */
export type RadioOptions = {
  checkedIndicator?: StaticallyComposableHTML<Radio>;
};

/**
 * A Radio Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radio | ARIA radio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual radio control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export class Radio extends FormAssociatedRadio implements RadioControl {
  /**
   * The name of the radio. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname | name attribute} for more info.
   */
  @observable
  public name!: string;

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
  public defaultSlottedNodes!: Node[];

  private get radioGroup() {
    return (this as HTMLElement).closest('[role=radiogroup]') as RadioGroup | null;
  }

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
    return this.radioGroup !== null;
  }

  /**
   * Handles key presses on the radio.
   * @beta
   */
  public keypressHandler(e: KeyboardEvent): boolean | void {
    switch (e.key) {
      case keySpace:
        if (!this.checked && !this.radioGroup?.readOnly) {
          this.checked = true;
        }
        return;
    }

    return true;
  }
}
