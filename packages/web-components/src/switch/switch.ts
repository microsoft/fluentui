import { attr, observable } from '@microsoft/fast-element';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML } from '../utils/index.js';
import { SwitchLabelPosition } from './switch.options.js';
import { FormAssociatedSwitch } from './switch.form-associated.js';

export type SwitchOptions = {
  switch?: StaticallyComposableHTML<Switch>;
};

/**
 * A Switch component that provides a toggleable input control.
 * @class Switch
 * @extends FormAssociatedSwitch
 *
 * @attr label-position - The label position of the switch.
 * @attr readonly - When true, the control will be immutable by user interaction.
 *
 * @csspart label - The label of the switch.
 * @csspart switch - The switch element.
 * @csspart checked-indicator - The checked indicator of the switch.
 *
 * @slot - The default slot for the label content.
 * @slot switch - Slot for custom switch content.
 *
 * @summary The Switch component provides a toggleable input control.
 *
 * @tag fluent-switch
 *
 * @public
 */
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
   * Creates a new instance of the Switch class.
   */
  public constructor() {
    super();

    this.proxy.setAttribute('type', 'checkbox');
  }

  /**
   * Handles the keypress event for the switch control.
   *
   * @internal
   * @param e - The keyboard event.
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
   * Handles the click event for the switch control.
   *
   * @internal
   * @param e - The mouse event.
   */
  public clickHandler = (e: MouseEvent) => {
    if (!this.disabled && !this.readOnly) {
      this.checked = !this.checked;
    }
  };
}
