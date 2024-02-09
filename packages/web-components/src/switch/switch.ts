import { attr, observable } from '@microsoft/fast-element';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML } from '../utils/index.js';
import { SwitchLabelPosition } from './switch.options.js';
import { FormAssociatedSwitch } from './switch.form-associated.js';

export type SwitchOptions = {
  switch?: StaticallyComposableHTML<Switch>;
};

export class Switch extends FormAssociatedSwitch {
  /**
   * The label position of the switch
   *
   * @public
   * @default 'after'
   * @remarks
   * HTML Attribute: labelposition
   */
  @attr({ attribute: 'label-position' })
  public labelPosition: SwitchLabelPosition | undefined;

  /**
   * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: readonly
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly!: boolean; // Map to proxy element
  protected readOnlyChanged(): void {
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
  public defaultSlottedNodes!: Node[];

  public constructor() {
    super();

    this.proxy.setAttribute('type', 'checkbox');
  }

  /**
   * @internal
   */
  public keypressHandler = (e: KeyboardEvent) => {
    if (this.readOnly) {
      return;
    }

    switch (e.key) {
      case keyEnter:
      case keySpace:
        this.checked = !this.checked;
        break;
    }
  };

  /**
   * @internal
   */
  public clickHandler = (e: MouseEvent) => {
    if (!this.disabled && !this.readOnly) {
      this.checked = !this.checked;
    }
  };
}
